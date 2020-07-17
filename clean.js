const fs = require('fs-extra');

fs.emptyDirSync('dist');
fs.copySync('index.html', 'dist/index.html');
fs.copySync('fonts', 'dist/fonts');
