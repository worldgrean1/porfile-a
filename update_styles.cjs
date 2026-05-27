const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove brackets and slashes from text
content = content.replace(/\[ SYSTEM CHOREOGRAM \]/g, 'SYSTEM CHOREOGRAM');
content = content.replace(/phase_rads::/g, 'PHASE RADS ');
content = content.replace(/— ENTRY \/ IDENTITY GATE/g, 'ENTRY GATE');
content = content.replace(/— SYSTEM ENTRY/g, 'SYSTEM ENTRY');
content = content.replace(/— IDENTITY REVEAL/g, 'IDENTITY REVEAL');
content = content.replace(/▼ SYSTEM PHASE 03 — /g, '');
content = content.replace(/— MANIFESTO/g, 'MANIFESTO');
content = content.replace(/— INTERACTIVE SYSTEMS/g, 'INTERACTIVE SYSTEMS');
content = content.replace(/— OUR PROCESS/g, 'OUR PROCESS');
content = content.replace(/— PROFILE STATUS/g, 'PROFILE STATUS');
content = content.replace(/— INQUIRY COORDINATES — HANDSHAKE/g, 'INQUIRY COORDINATES');

// Specifically removing // from labels in JSX
content = content.replace(/>\/\//g, '>');

// Remove italic and overly styled text elements
content = content.replace(/italic /g, '');
content = content.replace(/tracking-\[0\.25em\]/g, 'tracking-widest');

fs.writeFileSync(file, content);
console.log('App.tsx typography cleaned up.');
