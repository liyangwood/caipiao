module.exports = {
  publicPath : process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir : 'dist',
  css: {
    extract: true,
    modules: false,
    loaderOptions: {
      sass: {
        data: `
          @import "@/style/index.scss";
        `
      }
    }
  },
  devServer: {
    port : 3001,
    https : false,
    // proxy: {
    //   '/api': {
    //     target: 'https://api-wallet-ela-testnet.elastos.org',
    //     changeOrigin: true,
    //     // "pathRewrite": {
    //     //   "^/api/": "/api"
    //     // },
    //     // disableHostCheck: false
    
    //   }
    // }
  }

}