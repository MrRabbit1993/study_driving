export default {
  name: "home",
  path: '/home',
  component: r =>  require.ensure([], () => r(require('./index')), 'home'),
};
