// yarn add compression selfsigned spdy del http-proxy-middleware -D

const fs = require("fs");
const path = require("path");
const http = require("http");
const chalk = require("chalk");
const compress = require("compression");
const selfsigned = require("selfsigned");
const spdy = require("spdy");
const del = require("del");
const httpProxyMiddleware = require("http-proxy-middleware");
const { info } = require("@vue/cli-shared-utils");
const prepareURLs = require("@vue/cli-service/lib/util/prepareURLs");
const prepareProxy = require("@vue/cli-service/lib/util/prepareProxy");
const defaults = {
  host: "0.0.0.0",
  port: 8080,
  https: false
};
const log = console.log; // eslint-disable-line no-console

module.exports = (api, projectOptions) => {
  api.registerCommand(
    "http-server",
    {
      description: "start http server",
      usage: "node ./build/service.js http-server [options]",
      options: {
        "--open": `open browser on server start`,
        "--host": `specify host (default: ${defaults.host})`,
        "--port": `specify port (default: ${defaults.port})`,
        "--https": `use https (default: ${defaults.https})`
      }
    },
    args => {
      info("Starting http server...");
      // although this is primarily a dev server, it is possible that we
      // are running it in a mode with a production env, e.g. in E2E tests.

      // const serverOptions = Object.assign({}, api.service.projectOptions.devServer)
      const serverOptions = Object.assign({}, projectOptions.devServer);
      const useHttps = args.https || serverOptions.https || defaults.https;
      const host =
        args.host || process.env.HOST || serverOptions.host || defaults.host;
      const port =
        args.port || process.env.PORT || serverOptions.port || defaults.port;

      const express = require("express");
      const app = express();

      const webpackConfig = api.resolveWebpackConfig();
      // console.log("webpackConfig::::", webpackConfig.output)
      // const context = webpackConfig.context
      const config = Array.isArray(webpackConfig)
        ? webpackConfig[0]
        : webpackConfig;

      const rootLocation = config.output.publicPath;
      const root = config.output.path;

      const urls = prepareURLs(useHttps ? "https" : "http", host, port);

      const proxySettings = prepareProxy(
        serverOptions.proxy || {},
        api.resolve("public")
      );

      // Enable gzip compression.
      app.use(compress());
      app.use(rootLocation === "/" ? "*" : rootLocation, express.static(root));

      /**
       * Assume a proxy configuration specified as:
       * proxy: {
       *   'context': { options }
       * }
       * OR
       * proxy: {
       *   'context': 'target'
       * }
       */

      const getProxyMiddleware = proxyConfig => {
        const context = proxyConfig.context || proxyConfig.path;

        // It is possible to use the `bypass` method without a `target`.
        // However, the proxy middleware has no use in this case, and will fail to instantiate.
        if (proxyConfig.target) {
          return httpProxyMiddleware(context, proxyConfig);
        }
      };

      proxySettings.forEach(proxyConfigOrCallback => {
        let proxyConfig;
        let proxyMiddleware;

        if (typeof proxyConfigOrCallback === "function") {
          proxyConfig = proxyConfigOrCallback();
        } else {
          proxyConfig = proxyConfigOrCallback;
        }

        proxyMiddleware = getProxyMiddleware(proxyConfig);
        // if (proxyConfig.ws) {
        //   websocketProxies.push(proxyMiddleware)
        // }

        app.use((req, res, next) => {
          if (typeof proxyConfigOrCallback === "function") {
            const newProxyConfig = proxyConfigOrCallback();
            if (newProxyConfig !== proxyConfig) {
              proxyConfig = newProxyConfig;
              proxyMiddleware = getProxyMiddleware(proxyConfig);
            }
          }
          const bypass = typeof proxyConfig.bypass === "function";
          // eslint-disable-next-line
          const bypassUrl = bypass && proxyConfig.bypass(req, res, proxyConfig) || false;

          if (bypassUrl) {
            req.url = bypassUrl;
            next();
          } else if (proxyMiddleware) {
            return proxyMiddleware(req, res, next);
          } else {
            next();
          }
        });
      });
      // apply in project middlewares
      serverOptions.before &&
        typeof serverOptions.before === "function" &&
        serverOptions.before(app);

      return new Promise((resolve, reject) => {
        let server;
        if (serverOptions.https) {
          // for keep supporting CLI parameters
          if (typeof serverOptions.https === "boolean") {
            serverOptions.https = {
              key: serverOptions.key,
              cert: serverOptions.cert,
              ca: serverOptions.ca,
              pfx: serverOptions.pfx,
              passphrase: serverOptions.pfxPassphrase,
              requestCert: serverOptions.requestCert || false
            };
          }

          let fakeCert;
          if (!serverOptions.https.key || !serverOptions.https.cert) {
            // Use a self-signed certificate if no certificate was configured.
            // Cycle certs every 24 hours
            const certPath = path.join(__dirname, "../ssl/server.pem");
            let certExists = fs.existsSync(certPath);

            if (certExists) {
              const certStat = fs.statSync(certPath);
              const certTtl = 1000 * 60 * 60 * 24;
              const now = new Date();

              // cert is more than 30 days old, kill it with fire
              if ((now - certStat.ctime) / certTtl > 30) {
                log("SSL Certificate is more than 30 days old. Removing.");
                del.sync([certPath], { force: true });
                certExists = false;
              }
            }

            if (!certExists) {
              log("Generating SSL Certificate");
              const attrs = [{ name: "commonName", value: "localhost" }];
              const pems = selfsigned.generate(attrs, {
                algorithm: "sha256",
                days: 30,
                keySize: 2048,
                extensions: [
                  {
                    name: "basicConstraints",
                    cA: true
                  },
                  {
                    name: "keyUsage",
                    keyCertSign: true,
                    digitalSignature: true,
                    nonRepudiation: true,
                    keyEncipherment: true,
                    dataEncipherment: true
                  },
                  {
                    name: "subjectAltName",
                    altNames: [
                      {
                        // type 2 is DNS
                        type: 2,
                        value: "localhost"
                      },
                      {
                        type: 2,
                        value: "localhost.localdomain"
                      },
                      {
                        type: 2,
                        value: "lvh.me"
                      },
                      {
                        type: 2,
                        value: "*.lvh.me"
                      },
                      {
                        type: 2,
                        value: "[::1]"
                      },
                      {
                        // type 7 is IP
                        type: 7,
                        ip: "127.0.0.1"
                      },
                      {
                        type: 7,
                        ip: "fe80::1"
                      }
                    ]
                  }
                ]
              });

              fs.writeFileSync(certPath, pems.private + pems.cert, {
                encoding: "utf-8"
              });
            }
            fakeCert = fs.readFileSync(certPath);
          }

          serverOptions.https.key = serverOptions.https.key || fakeCert;
          serverOptions.https.cert = serverOptions.https.cert || fakeCert;

          if (!serverOptions.https.spdy) {
            serverOptions.https.spdy = {
              protocols: ["h2", "http/1.1"]
            };
          }

          server = spdy.createServer(serverOptions.https, app);
        } else {
          server = http.createServer(app);
        }
        server.listen(port, host, function(err) {
          if (err) {
            log(err);
            return reject(err);
          }
          ["SIGINT", "SIGTERM"].forEach(signal => {
            process.on(signal, () => {
              server.close(() => {
                process.exit(0);
              });
            });
          });
          console.log();
          console.log(
            [
              `  App running at:`,
              `  - Local:   ${chalk.cyan(
                urls.localUrlForTerminal + rootLocation.slice(1)
              )}`,
              `  - Network: ${chalk.cyan(
                urls.lanUrlForTerminal + rootLocation.slice(1)
              )}`
            ].join("\n")
          );
          console.log();
          resolve();
        });

        // if (useHttps) {
        //   //   privateKey  = fs.readFileSync('/path/to/private.pem', 'utf8');
        //   //   certificate = fs.readFileSync('/path/to/file.crt', 'utf8');
        //   //   credentials = {key: privateKey, cert: certificate};
        //   const pem = require('pem')
        //   pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
        //     if (err) {
        //       throw err
        //     }
        //     server = https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(port)
        //   })
        // } else {
        //   server = http.createServer(app).listen(port)
        // }
      });
    }
  );
};
