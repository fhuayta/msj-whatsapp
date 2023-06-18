const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
//const ora = require('ora');
//const chalk = require('chalk');

// let client;
// let sessionData;

// -------------------------OOO
const client = new Client();
// const client = new Client({
//     authStrategy: new LocalAuth()
// });

client.on('qr', qr => {
    console.log('--log--', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    enviarMensaje('59176262897@c.us', '***Acabo de iniciar sesion');
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
    // console.log('--log--MENSAJE: ', message);
	// console.log(message.body);
    if(message.body === '!ping') {
		message.reply('pong');
	}
    if (message.from.includes('75812762') ) {
        console.log('--log--MENSAJE de: ', message.from);
        console.log('--log--MENSAJE 75812762 contenido: ', message.body);
        const fecha = new Date();
        try {
            fs.writeFile('/home/franz/Descargas/CONV/converGl1.txt', '\n\n'+ ':'+ fecha.toLocaleString()+ ': ' + message.body, { flag: 'a+' }, (err) => {})
            //file written successfully
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




//fs.writeFile('/home/franz/Descargas/converGl1.txt', '\n'+'11111111111AAAA', { flag: 'a+' }, (err) => {})
//fs.writeFile('/home/franz/Descargas/converGl1.txt', '\n'+'22222222222BBBB', { flag: 'a+' }, (err) => {})



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