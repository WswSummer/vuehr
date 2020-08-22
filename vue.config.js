// 前后端接口对接---配置请求转发
// 前端请求 ---> node.js ---> 后端接口
let proxyObj = {};
proxyObj['/'] = {
    ws: false,
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
};

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}