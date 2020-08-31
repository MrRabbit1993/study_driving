function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
}
