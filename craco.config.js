const port = process.env.BLOCKLET_PORT || process.env.PORT || 8080;
const path = require('path');

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
    webpack: {
        alias: {
            components: pathResolve('src/components'),
            utils: pathResolve('src/utils'),
            '@': pathResolve('src/pages'),
        },
    },
    devServer: {
        port,
        client: {
            // If you want to development this blocklet without blocklet-server, you can delete next line, otherwise the hot reload will be failed.
            webSocketURL: 'wss://0.0.0.0/ws',
        },
    },
};
