const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace 05, 06, 07
content = content.replace(/\{\/\* 05 \/\/ SKILLS UNIVERSE SECTION \*\/\}[\s\S]*?\{\/\* 08 \/\/ INTERACTIVE GAME ZONE \*\/\}/, '{/* 08 // INTERACTIVE GAME ZONE */}');

// Replace 10
content = content.replace(/\{\/\* 10 \/\/ PROFILE ACTIVE MODE \(AFTER SIGN-IN\) \*\/\}[\s\S]*?\{\/\* 11 \/\/ CONTACT \/ COLLABORATION \*\/\}/, '{/* 11 // CONTACT / COLLABORATION */}');

// Replace Modal
content = content.replace(/\{\/\* Flagship Detailed Case Study Info Overlay Modal \*\/\}[\s\S]*?\{\/\* Persistent Floating Conversion CTA \*\/\}/, '{/* Persistent Floating Conversion CTA */}');

fs.writeFileSync(file, content);
console.log('Sections deleted successfully.');
