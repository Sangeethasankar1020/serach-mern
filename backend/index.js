
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/database/database');
const itemRoutes = require('./src/routes/itemRoutes');
const app = express();
app.use(cors());
app.use(bodyParser.json());



app.use('/api', itemRoutes);//parent api for user registers


// data base
connectDB.on("open", () => {
    app.listen(3000, () => {
        console.log("http://localhost:3000/");
    })

});
app.get("/", (req, res) => {
    res.send("im connected to server")
})

connectDB.on("error", () => {
    console.log("error db");
});

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});
