const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update sectionsMap comments
content = content.replace("{ id: 'gamezone',   color: '#FFFFFF', text: '#000000' }, // 08 → now cream", "{ id: 'gamezone',   color: '#FFFFFF', text: '#000000' }, // 05");
content = content.replace("{ id: 'process',    color: '#FFFFFF', text: '#000000' }, // 09", "{ id: 'process',    color: '#FFFFFF', text: '#000000' }, // 06");
content = content.replace("{ id: 'contact',    color: '#FFFFFF', text: '#000000' }, // 11", "{ id: 'contact',    color: '#FFFFFF', text: '#000000' }, // 07");
content = content.replace("{ id: 'signout',    color: '#FFFFFF', text: '#000000' }, // 12", "{ id: 'signout',    color: '#FFFFFF', text: '#000000' }, // 08");

// Update JSX section comments and visible labels
content = content.replace("{/* 08 // INTERACTIVE GAME ZONE */}", "{/* 05 // INTERACTIVE GAME ZONE */}");
content = content.replace("08 — INTERACTIVE SYSTEMS", "05 — INTERACTIVE SYSTEMS");

content = content.replace("{/* 09 // PROCESS SECTION */}", "{/* 06 // PROCESS SECTION */}");
content = content.replace("09 — OUR PROCESS", "06 — OUR PROCESS");

content = content.replace("{/* 11 // CONTACT / COLLABORATION */}", "{/* 07 // CONTACT / COLLABORATION */}");
content = content.replace("11 — INQUIRY COORDINATES — HANDSHAKE", "07 — INQUIRY COORDINATES — HANDSHAKE");

content = content.replace("{/* 12 // EXIT / SIGN OUT SCENE */}", "{/* 08 // EXIT / SIGN OUT SCENE */}");

fs.writeFileSync(file, content);
console.log('Numbers updated.');
