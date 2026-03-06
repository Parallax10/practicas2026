const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
require('dotenv').config({ path: '.env.local' });
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});

// Función para registrar los parciales
function registerPartial(name, fileName) {
    const partialPath = path.join(__dirname, `../src/styles/partials/${fileName}`);
    if (fs.existsSync(partialPath)) {
        const partialContent = fs.readFileSync(partialPath, 'utf8');
        Handlebars.registerPartial(name, partialContent);
    } else {
        console.warn(`⚠️ Aviso: No se encontró el parcial -> src/styles/partials/${fileName}`);
    }
}
registerPartial('navbar', '_navbar.hbs');
registerPartial('filters', '_filters.hbs');
registerPartial('cards', '_cards.hbs');
registerPartial('footer', '_footer.hbs');
registerPartial('details', '_details.hbs');
registerPartial('utilities', '_utilities.hbs');

// 1. Obtener el nombre de la tienda desde el .env.local
let siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'El Motorista';
// Limpiamos comillas y espacios
siteName = siteName.replace(/^["']|["']$/g, '').trim(); 

// 2. Convertir el nombre a formato de archivo (Ej: "El Motorista" -> "ElMotorista.json")
const fileName = siteName.replace(/\s+/g, '') + '.json';
const themeFilePath = path.join(__dirname, `../src/themes/${fileName}`);

if (!fs.existsSync(themeFilePath)) {
    console.error(`❌ ERROR: No se encontró el archivo de configuración en: src/themes/${fileName}`);
    process.exit(1);
}

// 3. Leer el archivo específico de la carpeta themes
let siteData = JSON.parse(fs.readFileSync(themeFilePath, 'utf8'));

if (siteData[siteName]) {
    siteData = siteData[siteName];
} else if (siteData[siteName.replace(/\s+/g, '')]) {
    siteData = siteData[siteName.replace(/\s+/g, '')];
}

// 4. SOBRESCRIBIR EL theme.json
const rootThemePath = path.join(__dirname, '../theme.json');
fs.writeFileSync(rootThemePath, JSON.stringify(siteData, null, 2));
console.log(`✅ Archivo theme.json sobrescrito exitosamente con los datos de: ${siteName}`);

// 5. Leer plantilla
const templatePath = path.join(__dirname, '../src/styles/theme.scss.hbs');
if (!fs.existsSync(templatePath)) {
    console.error(`❌ ERROR: No se encontró la plantilla ${templatePath}`);
    process.exit(1);
}
const templateSource = fs.readFileSync(templatePath, 'utf8');
const template = Handlebars.compile(templateSource);

// 6. Meter los datos en el SCSS
const result = template({
    colors: siteData.theme.colors,
    fonts: siteData.theme.fonts,
    styles: siteData.styles || {}
});

// 7. Generar el SCSS
const outputPath = path.join(__dirname, '../src/styles/dynamicTheme.module.scss');
fs.writeFileSync(outputPath, result);

console.log(`✅ Estilos SCSS ensamblados y compilados con éxito para: ${siteName}`);