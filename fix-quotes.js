const fs = require('fs');

const file = '/tmp/cc-agent/67258307/project/src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace smart quotes with regular quotes
content = content.replace(/[""]/g, '"');
content = content.replace(/['']/g, "'");

fs.writeFileSync(file, content);
console.log('Fixed quote characters');
