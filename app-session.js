const { Client, LegacySessionAuth, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');



//const ora = require('ora');
//const chalk = require('chalk');

// let client;
// let sessionData;

// -------------------------OOO
// const client = new Client();
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('--log--', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    enviarMensaje('59176262897@c.us', '***Acaban de iniciar sesion');
});

const listenMessage = () => {
    client.on('message', (msg) => {
        const {from, to, body}  = msq;
        console.log('--log--', from, to, body);
    })
}

const sendMessage = (to, message) => {
    client.sendMessage();
}

client.on('message', message => {
    console.log('--log--MENSAJE: ', message);
	console.log(message.body);
    if( message.body &&  (message.body.toUpperCase().trim() === 'PING') ) {
	    message.reply('pong - Respuesta');
	}
});

/**
 *
 * @param {*} to numero de celular internacional
 * @param {*} message mensaje que se enviara
 */
const enviarMensaje = (to, message) => {
    client.sendMessage(to, message);

    // const media = MessageMedia.fromFilePath('/tmp/carnet-adepc-min.png');
    // const media = MessageMedia.fromFilePath('/home/franz/Descargas/java.png');
    // const media = MessageMedia.fromFilePath('/home/franz/Descargas/kotlin-logo.png');
    const media = MessageMedia.fromFilePath('/home/franz/Documentos/kotlin-logo.png');
    client.sendMessage(to, media);
}

const enviarImagenPng = (to, messageImageBase64) => {
    // const media = new MessageMedia('image/png', messageImageBase64);
    const media = MessageMedia.fromFilePath('/tmp/carnet-adepc-min.png');
    client.sendMessage(to, media);
}

client.on('authenticated', (session) => {
    console.log('--log-- ESTAMOS AUTENTICADOS = ', session);
    // Save the session object however you prefer.
    // Convert it to json, save it to a file, store it in a database...
});



client.initialize();

// -------------------------OOO

// -------------------------XXX
// const SESION_FILE_PATH = './sesion.json';
// const conSesion = () => {

// }
// /**
//  * genera el codigo QR 
//  */
// const sinSesion = () => {
//     console.log('--log--NO HAY SESION GUARDADA');
//     client = new Client();
//     client.on('qr', qr => {
//         console.log('--log--', qr);
//         qrcode.generate(qr, {small: true});
//     });

//     client.on('authenticated', (session) => {
//         // guardamos credenciales
//         console.log('--log--SESSION = ',  session);
//         sessionData = session;
//         fs.writeFile(SESION_FILE_PATH, JSON.stringify(session), (err) => {
//             if (err) {
//                 console.log('--log--ERROR auth =', err);
//             }
//         });

//     });

//     client.initialize();
// }

// (fs.existsSync(SESION_FILE_PATH)) ? conSesion() : sinSesion()

// -------------------------XXX

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = 3013;
app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.post('/mensaje', (req, res) => {
    console.log("Method called is -- ", req.method)
    console.log('body is ', req.body);
    enviarMensaje(req.body.to+'@c.us', '' + req.body.mensaje);
    res.sendStatus(200);
 })

 app.post('/mensajes', (req, res) => {
    console.log('body is ', req.body);
    // agregar 591
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
