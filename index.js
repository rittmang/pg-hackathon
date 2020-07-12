const express = require("express");
const path = require("path");
const http = require('http')
var mongoose = require('mongoose');
const fileUpload = require("express-fileupload");
const fs = require("fs");
var TelegramBot = require('telegrambot');
var request = require('request');
var rp = require('request-promise');
const { Http2ServerRequest } = require("http2");
const { export_to_mongo } = require("./excel/texas");
const PORT = process.env.PORT || 5000;

const api = require('./routes/api');

const excel = require('./routes/excel');

mongoose.connect('mongodb+srv://ritom:ritom@fustercluck-skuxd.mongodb.net/pg-hackathon?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//mongoose.connect('mongodb://localhost/license');

var db = mongoose.connection;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.use('/api', api);

app.use('/excel', excel);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("pages/index"));

app.get("/status", (req, res) => res.render("pages/status"));

app.get("/statusMany", (req, res) => res.render("pages/statusMany"));



app.post("/upload", function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        //return res.status(400).send('No files were uploaded.');
        res.redirect("/");
    }
    var api = new TelegramBot('1290276577:AAFZzrPvTRvRiE-WfbvELVVXW153xksAv7Y');
    api.invoke('getUpdates', { offset: 0 }, function (err, updates) {
        if (err) throw err;
        //console.log(updates);
    });

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let upload_file = req.files.upload_file;
    let body = req.body;
    var subject = null;
    if (body['wantMail'] != 0){
        subject = body['subject']
    }
    console.log(subject);
    console.log(body);
    var name = upload_file.name;
    if (name.search("xlsx") == -1){
        
        //res.redirect("/");
        //http://localhost:5000/
        //http://pg-hackathon.herokuapp.com/
        res.send('<script> window.alert("Please Upload xlsx file");window.location.href="http://pg-hackathon.herokuapp.com/";</script>')
    }
    else
    {
    // Use the mv() method to place the file somewhere on your server
    upload_file.mv("uploads/" + "input.xlsx", async function (err) {
        if (err) return res.status(500).send(err);
        /*const directoryPath = path.join(__dirname, "uploads");
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log("Unable to scan directory:" + err);
            }
            //list all files
            api.sendMessage({ chat_id: -1001279904398, text: 'Narayan Narayan\nNew file uploaded!' }, function (err, message) {
                if (err) throw err;
                //console.log(message);
            });
            files.forEach(function (file) {
                console.log(file);
                if (file != 'test.xlsx' && file != 'file-to-upload-in-portal.xlsx') {
                    api.sendDocument({ chat_id: -1001279904398, document: fs.createReadStream(__dirname + "/uploads/" + file) }, function (err, message) {
                        if (err) throw err;
                        console.log(message);
                    })
                }

            });
        });*/

        //var listPeople=main_controller();

        
        var list_p = await main_2(subject)
        res.render("pages/statusMany", {"listPeople":list_p});
        //main_2.then(alert)
        //res.send(await Promise.all(promiseArray));
        
        //res.redirect("/statusMany");        
        
    });
    }
});

app.get('/download', function(req, res){
    const file = `${__dirname}/uploads/output_file.xlsx`;
    res.download(file); // Set disposition and send it.
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


async function main_2(subject)
{
    var listPeople = [];
    if (typeof require !== 'undefined') XLSX = require('xlsx');
    var workbook = XLSX.readFile('./uploads/input.xlsx', { type: "array" });
    var sheet_name_list = workbook.SheetNames;
    var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    
    var workbook_op = XLSX.readFile('./uploads/output_head.xlsx', { type: "array" });
    var sheet_name_list_op = workbook_op.SheetNames;
    var dict = XLSX.utils.sheet_to_json(workbook_op.Sheets[sheet_name_list_op[0]]);

    var newData = new Array();
    
    // every for reinit remember
    for (var i=0; i<data.length;i++)
    {
        var dict = XLSX.utils.sheet_to_json(workbook_op.Sheets[sheet_name_list_op[0]]);
        for (var key in data[i]) {
            if (data[i].hasOwnProperty(key)) {           
                //console.log(key, data[0][key]);
                dict[0][key] = data[i][key]
            }
        }
        //code to send to status many
        var VerificationList = {
            "Name " : data[i]["first name"]+" "+data[i]["last name"],
            "State " : data[i]["state license state from application"],
            "Application Id" : data[i]["app id"],
            "State License": "Verified",
            "DEA Permit" : "Manual",
            "OIG/DHHS" : "Verified",
            "NPDB Lookup" : "Manual",
            "NPI Verification" : "Verified",
            "Malpractice " : "Manual",
            "Specialty Education Certificate" : "Manual",
        };
        

        //code to send end
        var state =data[i]["state license state from application"]
        var license_num =data[i]["state license number from application"]

        if (state != undefined || license_num != undefined)
        {
            //license_url = 'http://localhost:5000/api/?state='+state+'&lic_num='+license_num
            license_url = 'http://pg-hackathon.herokuapp.com/api?state='+state+'&lic_num='+license_num
            try{
                const promise = await rp(license_url).catch(console.log("Error"));
                //promises.push(promise);
                var res_dict =JSON.parse(promise)
                dict[0]["name on state license"] = res_dict["Name"]
                dict[0]["expiration date"] = res_dict["ExpiryDate"]
                dict[0]["status"] = res_dict["Status"]
                dict[0]["discipline indicator"] = res_dict["DisciplinaryAction"]
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = mm + '/' + dd + '/' + yyyy;
                dict[0]["verified date"] = today
            }
            catch
            {
                VerificationList["State License"] = "Error"
            }
            
        }
        npi_url = "http://pg-hackathon.herokuapp.com/api/npi/" + data[i]["npi number on application"]
        //const npi_promise = await rp(npi_url).catch(console.log("Error"));
        //var res_dict_npi =JSON.parse(npi_promise)
        //dict[0][" npi- dentists full name"] = npi_promise

        oig_url = "http://pg-hackathon.herokuapp.com/api/oig?first_name="+data[i]["first name"]+"&last_name="+data[i]["last name"]+ "&is_api=true"
        const oig_promise = await rp(oig_url).catch(console.log("Error"));
        var res_dict_oig =JSON.parse(oig_promise)
        dict[0]["oig"] = res_dict_oig["Result"]
        dict[0]["oig verified date"] = today
        
        newData.push(dict[0])
        listPeople.push(VerificationList)
    }
    var newWB = XLSX.utils.book_new()
    var newWS = XLSX.utils.json_to_sheet(newData)
    XLSX.utils.book_append_sheet(newWB,newWS,"jsonToXl")
    XLSX.writeFile(newWB,"./uploads/output.xlsx")
    if(subject != null) {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'imaginehackathon@gmail.com',
                pass: 'Dheeraj@123'
            }
        });

        var attachments = [{filename: 'output_file.xlsx', path: __dirname + '/uploads/output_file.xlsx'}];

        var mailOptions = {
            from: 'imaginehackathon@gmail.com',
            to: 'dkrocksup@gmail.com , indira.pimpalkhare@gmail.com , deveshbhogre@thescriptgroup.in , ritomgupta@zonc.eu , imaginehackathon@gmail.com',
            subject: subject,
            text: 'Dental Credentialing',
            attachments: attachments
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    return listPeople
    
}

