var nodemailer = require('nodemailer');

const mailSender = (recipient,subject,text) =>
{
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'cosmetic.donotrepaly@outlook.com',
          pass: 'Cc100100'
        }
      });
      
      var mailOptions = {
        from: 'cosmetic.donotrepaly@outlook.com',
        to: recipient,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = 
{
    mailSender
}