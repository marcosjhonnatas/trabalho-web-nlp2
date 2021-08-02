const app = require('./index');
const express = require('express');

app.use(express.static('public'))

app.listen(4000, (err) => {
    if (err) throw err;
    console.log('Server running in http://127.0.0.1:4000');
});