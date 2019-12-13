const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = {
    name: "klass-subsets-service",
    port: 3000
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("klass subsets service is running");
});

app.listen(config.port, ()=> console.log(`${config.name} listening on port ${config.port}`));