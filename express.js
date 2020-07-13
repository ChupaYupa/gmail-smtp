const express = require('express'); //require или import
const nodemailer = require("nodemailer"); //import nodemailer
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

let smtp_login = process.env.SMTP_LOGIN
let smtp_password = process.env.SMTP_PASSWORD
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password // generated ethereal password
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Departure Permit
app.use(cors({
    origin: 'https://chupayupa.github.io/chupa'
}));


app.get('/', function (req, res) {
    res.send('Hello World!');
});
//create andpointt
app.post('/submit', async function (req, res) {
    let { name, email, message } = req.body;
   let info =  await transporter.sendMail({
        from: 'Toma', // sender address
        to: "docsperj@gmail.com", // list of receivers
        subject: "HR", // Subject line
        text: "Test gmail", // plain text body
        html: `<b>HR message</b>

    <div>
    name: ${name}
    </div>
    <div>
    email:${email}
    </div>
    <div>
    message:${message}
    </div>`
    });
    //SUBMITED ON CLIENT
    res.send('Submited!');
});

//PORT APP LISTENER
let port = process.env.PORT || 3010
app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});