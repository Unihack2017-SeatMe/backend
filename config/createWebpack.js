const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

function createWebpackBackend(entryDirectory)
{
    return {
        output: {
            path: path.resolve(path.join('.', 'backend-build')),
            filename: 'backend-compiled-debug.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        externals: [nodeExternals()],
        bail: true,
        target: 'node',
        name: 'Backend Server',
        entry: entryDirectory,
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                useBabel: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new WebpackShellPlugin({onBuildEnd: ['node ./backend-build/backend-compiled-debug.js']})
        ],
        stats: {
            errors: true,
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: true
        }
    }
}

module.exports = createWebpackBackend;
