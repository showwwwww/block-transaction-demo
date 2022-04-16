const port = process.env.BLOCKLET_PORT || process.env.PORT || 8080;
const path = require('path');
const px2rem = require('postcss-px2rem-exclude');

const pathResolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
    webpack: {
        alias: {
            '@components': pathResolve('src/components'),
            '@utils': pathResolve('src/utils'),
            '@pages': pathResolve('src/pages'),
        },
    },
    babel: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
            [
                'import',
                {
                    libraryName: 'antd',
                    libraaryDirectory: 'es',
                    style: 'css',
                },
            ],
            '@babel/plugin-syntax-jsx',
            '@babel/plugin-transform-react-jsx',
        ],
    },
    devServer: {
        port,
        client: {
            // If you want to development this blocklet without blocklet-server, you can delete next line, otherwise the hot reload will be failed.
            webSocketURL: 'wss://0.0.0.0/ws',
        },
        proxy: {
            '/api': {
                target: 'https://blockchain.info',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    style: {
        postcss: {
            plugins: [
                px2rem({
                    remUnit: 37.5,
                    exclude: /node-modules/i,
                }),
            ],
        },
    },
};
