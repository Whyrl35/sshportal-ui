module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  PACKAGE_JSON: '"' + escape(JSON.stringify(require('../package.json'))) + '"'
}
