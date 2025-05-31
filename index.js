import nodeMailer from 'nodemailer';
import express from 'express';
import bodyParser from 'body-parser'
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("dist"));

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
      user: 'anasramadanking@gmail.com', // your email address
      pass: 'ixco cpfq zcwz bizs', // your email password
  },
});

app.get('/' , (req ,res ) => {

    res.sendFile(__dirname + "/dist/index.html");
})


app.post('/subscribe' , (req,res) => {
  const formData = req.body;
    const mailOptions = {
        from: '"Anas Ramadan | ICODE" <anasramadanking@gmail.com>',
        to: formData.email,
        subject: 'Subscribe To ICODE Website  From ' + formData.emali,
        html: `<!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p>${formData.email}</p>
            </div>
          </div>
        </body>
        </html>`,
    };
  try {
    transporter.sendMail(mailOptions);
    res.send('You Are Send Message Succussfully. <a href="/"> Click Here To Return </a>');
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }



    res.send('You Are Subscribe Succussfully. <a href="/"> Click Here To Return </a>');
})

app.post("/contact", (req , res ) => {
    const formData = req.body;
    const mailOptions = {
        from: '"Anas Ramadan | ICODE" <anasramadanking@gmail.com>',
        to: formData.email,
        subject: 'Email To ICODE Website  From ' + formData.f_name + ' ' + formData.l_name,
        html: `<!DOCTYPE html>
        <html>
        <head>
          <style>
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            body {
              color: #333;
              direction:ltr;
            }
            * {
              font-family: 'Bebas Neue', sans-serif;
              text-align:left;
            }
            h1 {
              color: #edac66;
              font-size: 24px;
              margin-bottom: 10px;
            }
        
            h3 {
              font-size: 18px;
              margin-top: 20px;
            }
        
            p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 10px;
            }
        
            span {
              font-weight: bold;
            }
        
            a {
              color: #007bff;
              text-decoration: none;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
        
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
        
            .details {
              margin-top: 30px;
            }
        
            .location {
              margin-top: 20px;
            }
        
            .contact {
              margin-top: 30px;
            }
        
            .contact p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>From ${formData.f_name} ${formData.l_name}</h1>
              <p>${formData.phone}</p>
              <p>${formData.email}</p>
            </div>
            <div class="message">
              <p>MSG:<br> ${formData.msg}</p>
            </div>
          </div>
        </body>
        </html>`,
    };
  try {
    transporter.sendMail(mailOptions);
    res.send('You Are Send Message Succussfully. <a href="/"> Click Here To Return </a>');
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

 