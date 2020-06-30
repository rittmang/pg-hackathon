const express = require("express");
const path = require("path");
const http=require('http')
var mongoose = require('mongoose');
const fileUpload = require("express-fileupload");
const fs = require("fs");

const { Http2ServerRequest } = require("http2");
const { export_to_mongo } = require("./excel/texas");
const PORT = process.env.PORT || 5000;

const texas = require('./routes/texas');
const penn = require('./routes/pennstate');
const nevada = require('./routes/nevada');
const newyork = require('./routes/newyork');
const california = require('./routes/california');
const colorado = require('./routes/colorado');

const npi = require('./routes/npi');

const excel = require('./routes/excel');

mongoose.connect('mongodb+srv://ritom:ritom@fustercluck-skuxd.mongodb.net/pg-hackathon?retryWrites=true&w=majority');
var db = mongoose.connection;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.use('/texas', texas);
app.use('/pennstate', penn);
app.use('/nevada', nevada);
app.use('/newyork', newyork);
app.use('/california', california);
app.use('/colorado', colorado);

app.use('/npi', npi);

app.use('/excel', excel);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("pages/index"));

app.get("/status", (req, res) => res.render("pages/status"));



app.post("/upload", function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        //return res.status(400).send('No files were uploaded.');
        res.redirect("/");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let upload_file = req.files.upload_file;
    var name = upload_file.name;
    // Use the mv() method to place the file somewhere on your server
    upload_file.mv("uploads/" + name, function (err) {
        if (err) return res.status(500).send(err);
        const directoryPath = path.join(__dirname, "uploads");
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log("Unable to scan directory:" + err);
            }
            //list all files
            files.forEach(function (file) {
                console.log(file);
            });
        });
        res.redirect("/");
    });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
