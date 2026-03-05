const fs = require('fs');
const Handlebars = require('handlebars');
require('dotenv').config({ path: '.env.local' });

const site = process.env.NEXT_PUBLIC_SITE_NAME || "El Motorista";
const themeData = JSON.parse(fs.readFileSync('./theme.json', 'utf8'))[site];

const templateSource = fs.readFileSync('./scripts/theme.scss.hbs', 'utf8');
const template = Handlebars.compile(templateSource);
const result = template(themeData);

fs.writeFileSync('./src/styles/dynamicTheme.scss', result);
// También podemos generar un JSON de config para el cliente
fs.writeFileSync('./src/config/current_site_config.json', JSON.stringify(themeData));