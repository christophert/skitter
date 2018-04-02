const path = require('path');

module.exports = {
    entry: './src/assets/js/bootstrap.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/assets/js')
    }
};
