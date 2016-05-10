const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const sendgridOptions = {
    auth: {
        api_user: sails.config.sendgridUsername,
        api_key: sails.config.sendgridPassword
    }
};

const emailClient = nodemailer.createTransport(sgTransport(sendgridOptions));

module.exports = {

    sendDownAlert: function(recipient, checkName) {
        const email = {
            from: sails.config.emailAddress,
            to: recipient,
            subject: `🚨  Monitaure alert: ${checkName} is DOWN!`,
            text: `Alert: ${checkName} is DOWN`
        };
        emailClient.sendMail(email, function(err) {
            if (err) return sails.log.error(err);
        });
    },

    sendUpAlert: function(recipient, checkName, outageDuration) {
        const email = {
            from: sails.config.emailAddress,
            to: recipient,
            subject: `✓ Monitaure alert: ${checkName} is back UP!`,
            text: `${checkName} is back up after ${outageDuration} minutes of downtime.`
        };
        emailClient.sendMail(email, function(err) {
            if (err) return sails.log.error(err);
        });
    },

    sendConfirmationEmail: function(user, callback) {
        const email = {
            from: sails.config.emailAddress,
            to: user.email,
            subject: `Monitaure account confirmation`,
            html: `To confirm your email address and activate your Monitaure account, <a href="${sails.config.baseUrl}/account/confirm/${user.confirmationToken}">click here</a>.<br/>If your did not try to create such account, please ignore this email.`
        };
        emailClient.sendMail(email, function(err) {
            if (err) return callback(err);

            return callback();
        });
    }
};