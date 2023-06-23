var express = require('express');
var app = express();
const helmet = require('helmet');


app.use(helmet.hidePoweredBy()); // Ocultar información potencialmente peligrosa usando helmet.hidePoweredBy()

app.use(helmet.frameguard({ action: 'deny' })); // Mitigar el riesgo de clickjacking con helmet.frameguard()

app.use(helmet.xssFilter()); // Mitigue el riesgo de ataques de Cross Site Scripting (XSS) con helmet.xssFilter()

app.use(helmet.noSniff()); // Evite inferir el tipo MIME de respuesta con helmet.noSniff()

app.use(helmet.ieNoOpen()); //Evite que IE abra HTML no confiable con helmet.ieNoOpen()


// Pida a los navegadores que accedan a su sitio a través de HTTPS solo con helmet.hsts()

const ninetyDaysInSeconds = 90 * 24 * 60 * 60; // Configuración del tiempo en segundos para 90 días

// Configuración de HSTS
const hstsConfig = {
  maxAge: ninetyDaysInSeconds,
  force: true
};

app.use(helmet.hsts(hstsConfig));// Uso de helmet.hsts()

// Pida a los navegadores que accedan a su sitio a través de HTTPS solo con helmet.hsts()


app.use(helmet.dnsPrefetchControl());//Deshabilite la captación previa de DNS con helmet.dnsPrefetchControl()

app.use(helmet.noCache());//Deshabilite el almacenamiento en caché del lado del cliente con helmet.noCache ()

//Establezca una política de seguridad de contenido con helmet.contentSecurityPolicy() y Configure el casco utilizando el middleware 'principal' del casco ()
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com']
  }
}));
//Establezca una política de seguridad de contenido con helmet.contentSecurityPolicy() y Configure el casco utilizando el middleware 'principal' del casco ()






























module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
