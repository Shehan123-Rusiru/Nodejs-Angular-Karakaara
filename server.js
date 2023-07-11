const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const mysql = require("mysql");
server.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbkarakaara",
});

const cors = require('cors');
server.use(cors({
    origin: '*'
}));

server.listen(8085, function check(error) {
    if (error) console.log("Error...!!");
    else console.log("Started...!!");
})


db.connect(function (error) {
    if (error)
        console.log("Error connecion to DB");
    else
        console.log("Started...!!!");
})

server.get("/api/products/:category", (req, res) => {
    var D_Category = req.params.category;
    var sql = "SELECT * FROM products WHERE category like" + D_Category;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("error in connection");
        } else {
            res.send({ status: true, data: result });
        }
    });
});