'use strict';

const  express 	= require('express');
const app 		= express();

const publicIp  = require('public-ip');
const ip2loc    = require("ip2location-nodejs");

ip2loc.IP2Location_init("./IP2LOCATION-LITE-DB1.BIN");


app.get('/test', (req, res) =>{
	(async () => {
        const ip = await publicIp.v4()
        return res.send({
            myIp: ip,
            country_short: ip2loc.IP2Location_get_all(ip).country_short,
            country_long: ip2loc.IP2Location_get_all(ip).country_long,
        })
    })();
});
app.get('/', (req, res) =>{
	console.log("hola");
});

app.listen(8080);
console.log(`Servidor escuchando en puerto 8080`);

app.on('error', err => {
	console.error(err);
});

