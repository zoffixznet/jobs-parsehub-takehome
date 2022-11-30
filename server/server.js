const PORT = 3001;
const ROOT = require('../data/tree.js').root;

const express = require("express");
const path = require("path");
const app = express();

console.log(['root', ROOT]);

// XXX TODO: expand path match restrictions, if our data format changes
app.get(/^\/path\/([A-Z0-9\/\ .-]+)$/i, function (req, res) {
    const parts     = path.normalize(req.path.substring('/path/'.length)).split('/');
    let   node      = ROOT;
    let   node_name = null;
    for (let i = 0, l = parts.length; i < l; i++) {
        node_name = parts[i];
        if ( ! node || ! node.children || ! node.children[node_name]) 
            return res.status(404).send('Not Found');
        node = node.children[node_name];
    }
    res.json({node, node_name});
});

console.log(`Starting server on http://localhost:${PORT}`);
app.listen(PORT);