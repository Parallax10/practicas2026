const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
require('dotenv').config({ path: '.env.local' });

// Registramos un ayudante para comparar valores (eq = equal/igual)
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

// Leemos la configuración
const themeConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../theme.json'), 'utf8'));
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'El Motorista';
const siteData = themeConfig[siteName];

const templateSource = fs.readFileSync(path.join(__dirname, 'theme.scss.hbs'), 'utf8');
const template = Handlebars.compile(templateSource);

// Le pasamos los datos del tema y los IDs de los estilos a la plantilla
const result = template({
  theme: siteData.theme,
  styles: siteData.styles || {}
});

fs.writeFileSync(path.join(__dirname, '../src/styles/dynamicTheme.module.scss'), result);
console.log(`✅ Estilos compilados con éxito para: ${siteName}`);