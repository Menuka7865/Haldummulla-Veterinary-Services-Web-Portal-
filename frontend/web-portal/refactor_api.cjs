const fs = require('fs');
const path = require('path');

const DIR = 'c:\\Users\\Admin\\OneDrive\\Desktop\\Haldummull web portal\\Haldummulla-Veterinary-Services-Web-Portal-\\frontend\\web-portal\\src';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('http://localhost:5000')) {
        let changed = false;
        
        // Add import if not present
        if (!content.includes('API_BASE_URL')) {
          const relativeToConfig = path.relative(path.dirname(fullPath), path.join(DIR, 'config.js')).replace(/\\/g, '/');
          const importPath = relativeToConfig.startsWith('.') ? relativeToConfig : './' + relativeToConfig;
          const importPathWithoutExt = importPath.replace('.js', '');
          const importStmt = `import { API_BASE_URL } from '${importPathWithoutExt}';\n`;
          content = importStmt + content;
        }

        // Replace http://localhost:5000/api strings
        content = content.replace(/['"`]http:\/\/localhost:5000\/api(.*?)['"`]/g, '`${API_BASE_URL}$1`');
        
        fs.writeFileSync(fullPath, content);
        console.log('Updated', fullPath);
      }
    }
  }
}

processDir(DIR);
