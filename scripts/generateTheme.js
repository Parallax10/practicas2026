const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
require('dotenv').config({ path: '.env.local' });

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "El Motorista";

const paths = {
    themeJson: path.join(__dirname, '../theme.json'),
    templateHbs: path.join(__dirname, '../src/styles/theme.scss.hbs'),
    outputScss: path.join(__dirname, '../src/styles/dynamicTheme.module.scss'),
    outputJson: path.join(__dirname, '../src/config/current_site_config.json'),
    outputIndexTs: path.join(__dirname, '../src/config/index.ts')
};

try {
    const themes = JSON.parse(fs.readFileSync(paths.themeJson, 'utf8'));
    const config = themes[siteName];

    if (!fs.existsSync(path.dirname(paths.outputJson))) {
        fs.mkdirSync(path.dirname(paths.outputJson), { recursive: true });
    }

    // 1. Generar JSON de configuración
    fs.writeFileSync(paths.outputJson, JSON.stringify(config, null, 2));

    // 2. Generar index.ts con las exportaciones correctas
    const indexContent = `// Archivo generado automáticamente
import siteConfig from './current_site_config.json';
export const config = siteConfig;
export { default as themeStyles } from '../styles/dynamicTheme.module.scss';
`;
    fs.writeFileSync(paths.outputIndexTs, indexContent);

    // 3. Generar SCSS mediante Handlebars
    const templateSource = fs.readFileSync(paths.templateHbs, 'utf8');
    const template = Handlebars.compile(templateSource);
    fs.writeFileSync(paths.outputScss, template(config));

    console.log(`✅ Configuración dinámica generada para: ${siteName}`);
} catch (error) {
    console.error("❌ Error en la generación:", error.message);
    process.exit(1);
}