const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const client = new Client();

client.on('qr', qr => {
    console.log('--log--QR: ', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Cliente iniciado!');
    // Example to send message
    const MESSAGE_ = '***Acabo de iniciar sesion';
    enviarMensaje('59176262897@c.us', MESSAGE_);
});
  
client.on('message', message => {
    if(message.body === '!ping') {
		message.reply('pong');
	}
    if (message.from.includes('75812762') ) {
        const fecha = new Date();
        try {
            fs.writeFile('/home/franz/Descargas/CONV/converGl1.txt', '\n\n'+ ':'+ fecha.toLocaleString()+ ': ' + message.body, { flag: 'a+' }, (err) => {})
        } catch (err) {
            console.error(err)
        }
    }
});

const enviarMensaje = (to, message) => {
    client.sendMessage(to, message);
}


client.on('authenticated', (session) => {
    console.log('--log-- ESTAMOS AUTENTICADOS = ', session);
    // Save the session object however you prefer.
    // Convert it to json, save it to a file, store it in a database...
});

// init Server with endpoints
client.initialize();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = 3013;
app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.post('/mensaje', (req, res) => {
    console.log("--log-- Method called is: ", req.method)
    enviarMensaje(req.body.to+'@c.us', '' + req.body.mensaje);
    res.sendStatus(200);
 })

 app.post('/mensajes', (req, res) => {
    console.log('--log-- body is ', req.body);
    // Add 591 to Bolivia's cellphones
    var interval = 2000;
    req.body.to.forEach(function (element, index) {
        setTimeout(function () {
            console.log('--log-- Enviar = ', element);
            enviarMensaje('591'+element+'@c.us', '' + req.body.mensaje);
        }, index * interval);
      });

    res.sendStatus(200);
 })

 function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))