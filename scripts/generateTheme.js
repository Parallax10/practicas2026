const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
require('dotenv').config({ path: '.env.local' });

// Registramos el ayudante de condiciones (if eq)
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

// Función para registrar las piezas (partials) de forma segura
function registerPartial(name, fileName) {
    const partialPath = path.join(__dirname, `../src/styles/partials/${fileName}`);
    if (fs.existsSync(partialPath)) {
        const partialContent = fs.readFileSync(partialPath, 'utf8');
        Handlebars.registerPartial(name, partialContent);
    } else {
        console.warn(`⚠️ Aviso: No se encontró la pieza del puzzle -> src/styles/partials/${fileName}`);
    }
}

// 1. Registramos todos los bloques de código (parciales)
registerPartial('navbar', '_navbar.hbs');
registerPartial('filters', '_filters.hbs');
registerPartial('cards', '_cards.hbs');
registerPartial('footer', '_footer.hbs');
registerPartial('details', '_details.hbs');
registerPartial('utilities', '_utilities.hbs');

// 2. Leer la configuración JSON
const themeConfigPath = path.join(__dirname, '../theme.json');
if (!fs.existsSync(themeConfigPath)) {
    console.error(`❌ ERROR: No se encontró el archivo theme.json`);
    process.exit(1);
}
const themeConfig = JSON.parse(fs.readFileSync(themeConfigPath, 'utf8'));

// 3. Obtener el nombre de la tienda desde el .env.local
let siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'El Motorista';
siteName = siteName.replace(/^["']|["']$/g, ''); // Limpiar comillas

const siteData = themeConfig[siteName];
if (!siteData) {
    console.error(`❌ ERROR: No se encontró la tienda "${siteName}" en theme.json`);
    process.exit(1);
}

// 4. Leer la plantilla maestra
const templatePath = path.join(__dirname, '../src/styles/theme.scss.hbs');
if (!fs.existsSync(templatePath)) {
    console.error(`❌ ERROR: No se encontró la plantilla ${templatePath}`);
    process.exit(1);
}
const templateSource = fs.readFileSync(templatePath, 'utf8');
const template = Handlebars.compile(templateSource);

// 5. Inyectar datos (colores y estilos)
const result = template({
  colors: siteData.theme.colors,
  fonts: siteData.theme.fonts,
  styles: siteData.styles || {}
});

// 6. Generar el SCSS definitivo para Next.js
const outputPath = path.join(__dirname, '../src/styles/dynamicTheme.module.scss');
fs.writeFileSync(outputPath, result);

console.log(`✅ Estilos ensamblados y compilados con éxito para: ${siteName}`);