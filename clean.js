const fs = require('fs-extra');

fs.emptyDirSync('dist');
fs.copySync('index.html', 'dist/index.html');
fs.copySync('favicon.ico', 'dist/favicon.ico');
fs.copySync('fonts', 'dist/fonts');
