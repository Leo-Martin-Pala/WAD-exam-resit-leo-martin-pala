
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/requests', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const strequest = await pool.query(
            "SELECT * FROM strequest"
        );
        res.json(strequest.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/api/submitrequest', async(req, res) => {
    try {
        console.log("A POST request has arrived");
        const { stcode, coursename, coursecode, strequest } = req.body;
        const newRequest = await pool.query(
            "INSERT INTO strequest (studentcode, coursename, coursecode, studentrequest) VALUES($1, $2, $3, $4) RETURNING *",
            [stcode, coursename, coursecode, strequest]
        );
        res.json(newRequest.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

