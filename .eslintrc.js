module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    // disabling the no-prototype-builtins rule because this project is fairly simple :
    // https://eslint.org/docs/rules/no-prototype-builtins
    // You may want to turn this rule off if your code only touches objects with hardcoded keys, and you will never use
    // an object that shadows an Object.prototype method or which does not inherit from Object.prototype.
    'no-prototype-builtins': 'off'
  }
}
