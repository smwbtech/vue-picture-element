module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: false
      }
    ],
    ['minify']
  ],
  plugins: ['transform-vue-jsx', '@babel/plugin-transform-runtime']
}
