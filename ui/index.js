'use strict';

const express = require('express');
const app = express();
const port = 80;
const _app_folder = 'dist/budgeteer/browser';

// serve static files through middleware
app.use('/', express.static(_app_folder));

// serve everything else to index.html
app.use('/*', (req, res) => {
    res.sendFile('index.html', { root: _app_folder });
});

// start express server
app.listen(port, () => console.log(`listening on port {port}`));