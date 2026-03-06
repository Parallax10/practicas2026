const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
require('dotenv').config({ path: '.env.local' });

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

const themeConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../theme.json'), 'utf8'));

let siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'El Motorista';
siteName = siteName.replace(/^["']|["']$/g, ''); // Limpiar comillas

const siteData = themeConfig[siteName];

if (!siteData) {
    console.error(`❌ ERROR: No se encontró la tienda "${siteName}" en theme.json`);
    process.exit(1);
}

const templateSource = fs.readFileSync(path.join(__dirname, '../src/styles/theme.scss.hbs'), 'utf8');
const template = Handlebars.compile(templateSource);

const result = template({
  colors: siteData.theme.colors,
  fonts: siteData.theme.fonts,
  styles: siteData.styles || {}
});

// Solo guardamos el SCSS, nada de archivos extra.
fs.writeFileSync(path.join(__dirname, '../src/styles/dynamicTheme.module.scss'), result);

console.log(`✅ Estilos compilados con éxito para: ${siteName}`);