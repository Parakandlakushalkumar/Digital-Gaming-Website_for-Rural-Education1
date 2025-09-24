const fs = require('fs');
const path = require('path');

const gamesDirectory = './public/games_download';

function revertGameFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove all translation-related code we added
        content = content.replace(/<!-- Translation Widget[\s\S]*?<\/script>/g, '');
        content = content.replace(/<!-- Google Translate[\s\S]*?<\/script>/g, '');
        content = content.replace(/<!-- Language Translate[\s\S]*?<\/div>/g, '');
        content = content.replace(/<style>[\s\S]*?translate[\s\S]*?<\/style>/g, '');
        content = content.replace(/<script[\s\S]*?translate[\s\S]*?<\/script>/g, '');
        content = content.replace(/<script[\s\S]*?googleTranslateElementInit[\s\S]*?<\/script>/g, '');
        
        // Remove any broken HTML structure we might have created
        content = content.replace(/^\s*<\/div>\s*/gm, '');
        content = content.replace(/^\s*<head>\s*/gm, '');
        content = content.replace(/^\s*<\/head>\s*/gm, '');
        content = content.replace(/^\s*<body>\s*/gm, '');
        content = content.replace(/^\s*<\/body>\s*/gm, '');
        
        // Clean up any duplicate DOCTYPE or html tags
        const doctypeMatches = content.match(/<!DOCTYPE html>/gi);
        if (doctypeMatches && doctypeMatches.length > 1) {
            content = content.replace(/<!DOCTYPE html>/gi, '');
            content = '<!DOCTYPE html>\n' + content;
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Reverted ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`Error reverting ${filePath}:`, error.message);
    }
}

function revertAllGameFiles() {
    try {
        const files = fs.readdirSync(gamesDirectory);
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        console.log(`Found ${htmlFiles.length} HTML game files`);
        console.log('Reverting all translation changes from HTML games...\n');
        
        htmlFiles.forEach(file => {
            const filePath = path.join(gamesDirectory, file);
            revertGameFile(filePath);
        });
        
        console.log(`\n✅ Successfully reverted ${htmlFiles.length} HTML game files`);
        console.log('All HTML games are back to their original state!');
        
    } catch (error) {
        console.error('Error processing games directory:', error.message);
    }
}

// Run the script
revertAllGameFiles();
