// Generated by CoffeeScript 1.6.2
(function() {
  var createServer, express, sg;

  express = require('express');

  sg = require('sendgrid-nodejs');

  createServer = function() {
    var app;

    app = express();
    app.configure(function() {
      var port;

      app.use('/app', express["static"]('../../client/app'));
      app.use(express.bodyParser());
      app.use(app.router);
      port = process.env.PORT || 8081;
      return app.listen(port);
    });
    app.post('/submit', function(req, res) {
      var from, header, headerHtml, headerText, html, htmlToV1, mail, mailForVolunteer, sender, signup, text;

      if (req.body == null) {
        return;
      }
      signup = req.body;
      html = signup.html;
      delete signup.html;
      signup = JSON.stringify(signup, null, 4);
      header = "" + req.body.firstName + " " + req.body.lastName + " <" + req.body.email + "> just signed up to volunteer with CoderDojo Ponce Springs!\n\n";
      text = header + signup;
      htmlToV1 = header + html;
      from = 'coderdojo@versionone.com';
      mail = new sg.Email({
        to: 'coderdojo@versionone.com',
        from: req.body.email,
        subject: "" + req.body.firstName + " " + req.body.lastName + " just signed up to volunteer with CoderDojo Ponce Springs!",
        text: text,
        html: htmlToV1
      });
      headerText = "" + req.body.firstName + " " + req.body.lastName + ", thanks for volunteering with CoderDojo Ponce Springs! Please fill out the attached background check authorization form and return it to us by following the instructions within it.\n\nHere is a copy of the information you sent us:\n\n";
      headerHtml = "" + req.body.firstName + " " + req.body.lastName + ", thanks for volunteering with CoderDojo Ponce Springs! <b>Please fill out the attached background check authorization form and return it to us by following the instructions within it.</b><br/><br/><hr/><br/>Here is a copy of the information you sent us:<br/><br/>";
      text = headerText + signup;
      html = headerHtml + html;
      mailForVolunteer = new sg.Email({
        to: req.body.email,
        from: from,
        subject: 'Confirmation of CoderDojo Ponce Springs sign up received',
        text: text,
        html: html,
        files: {
          'CoderDojoPonceSprings-BackgroundCheckAuthorization.pdf': __dirname + '/../../client/app/content/CoderDojoPonceSprings-BackgroundCheckAuthorization.pdf'
        }
      });
      sender = new sg.SendGrid('azure_087394ee528ccb83063ec69cc1b4f2cf@azure.com', 'jpzmaq95');
      sender.send(mail, function(success, err) {
        if (success) {
          return console.log('Email sent');
        } else {
          return console.log(err);
        }
      });
      sender.send(mailForVolunteer, function(success, err) {
        if (success) {
          return console.log('Email sent to volunteer');
        } else {
          return console.log(err);
        }
      });
      return res.send({
        status: 200,
        message: 'Success'
      });
    });
    return app;
  };

  module.exports = createServer;

}).call(this);