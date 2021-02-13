
const express = require('express');
const app = express();

const path = require('path');
const port = process.env.PORT || 3000;

const statusRouter = express.Router();

statusRouter.route('/status')
    .get((req,res) => {
        const response = { status: 'Good', db: 'Not Connected' };
        res.json(response);
    });

app.use('/api', statusRouter);
app.use( express.static(__dirname + '/public' ));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));