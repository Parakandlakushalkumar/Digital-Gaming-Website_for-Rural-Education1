const fs = require('fs');
const path = require('path');

const gamesDirectory = './public/games_download';

// Compact Google Translate code
const workingTranslateCode = `
    <!-- Google Translate - Compact Icon Version -->
    <script type="text/javascript">
      let translateOpen = false;
      
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'en'
        }, 'google_translate_element');
      }
      
      function toggleTranslate() {
        const dropdown = document.getElementById('translate-dropdown');
        translateOpen = !translateOpen;
        dropdown.style.display = translateOpen ? 'block' : 'none';
      }
      
      // Close when clicking outside
      document.addEventListener('click', function(e) {
        const icon = document.getElementById('translate-icon');
        const dropdown = document.getElementById('translate-dropdown');
        if (translateOpen && !icon.contains(e.target) && !dropdown.contains(e.target)) {
          translateOpen = false;
          dropdown.style.display = 'none';
        }
      });
    </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    
    <style>
      .translate-icon {
        position: fixed;
        top: 15px;
        right: 15px;
        z-index: 10000;
        width: 40px;
        height: 40px;
        background: #4285f4;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: transform 0.2s ease;
      }
      
      .translate-icon:hover {
        transform: scale(1.1);
      }
      
      .translate-dropdown {
        position: fixed;
        top: 60px;
        right: 15px;
        z-index: 9999;
        background: white;
        padding: 8px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        border: 1px solid #ddd;
        min-width: 150px;
        display: none;
      }
      
      .goog-te-banner-frame {
        display: none !important;
      }
      
      .goog-te-gadget {
        font-family: inherit !important;
        font-size: 12px !important;
      }
      
      .goog-te-combo {
        margin: 0 !important;
        padding: 2px 4px !important;
        border: 1px solid #ccc !important;
        border-radius: 4px !important;
        background: white !important;
        font-size: 12px !important;
        width: 100% !important;
      }
      
      body {
        top: 0 !important;
      }
      
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
    </style>`;

const workingTranslateWidget = `
    <!-- Language Translate Widget - Compact Icon Version -->
    <div id="translate-icon" class="translate-icon" onclick="toggleTranslate()">
      <span style="font-size: 18px; color: white;">🌐</span>
    </div>
    <div id="translate-dropdown" class="translate-dropdown">
      <div style="display: flex; align-items: center; gap: 6px; font-size: 12px;">
        <span>Translate:</span>
        <div id="google_translate_element"></div>
      </div>
    </div>`;

function fixTranslationInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove existing Google Translate code
    content = content.replace(/<!-- Google Translate -->[\s\S]*?<\/script>/g, '');
    content = content.replace(/<!-- Language Translate Widget -->[\s\S]*?<\/div>/g, '');
    content = content.replace(/<style>[\s\S]*?translate-container[\s\S]*?<\/style>/g, '');
    
    // Add working translate script to head
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${workingTranslateCode}\n  </head>`);
    } else {
      // If no head tag, add it
      if (content.includes('<html')) {
        const htmlTagEnd = content.indexOf('>') + 1;
        content = content.slice(0, htmlTagEnd) + `\n<head>${workingTranslateCode}\n</head>\n` + content.slice(htmlTagEnd);
      } else {
        content = `<head>${workingTranslateCode}\n</head>\n` + content;
      }
    }
    
    // Add working translate widget to body
    if (content.includes('<body')) {
      const bodyTagMatch = content.match(/<body[^>]*>/);
      if (bodyTagMatch) {
        const bodyTagEnd = content.indexOf(bodyTagMatch[0]) + bodyTagMatch[0].length;
        content = content.slice(0, bodyTagEnd) + `\n${workingTranslateWidget}\n` + content.slice(bodyTagEnd);
      }
    } else {
      // If no body tag, add widget at the beginning
      content = workingTranslateWidget + '\n' + content;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed translation in ${path.basename(filePath)}`);
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function fixAllGameTranslations() {
  try {
    const files = fs.readdirSync(gamesDirectory);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`Found ${htmlFiles.length} HTML game files`);
    console.log('Fixing translation code in all games...\n');
    
    htmlFiles.forEach(file => {
      const filePath = path.join(gamesDirectory, file);
      fixTranslationInFile(filePath);
    });
    
    console.log(`\n✅ Successfully fixed translation in ${htmlFiles.length} game files`);
    console.log('All games now have working Google Translate functionality!');
    
  } catch (error) {
    console.error('Error processing games directory:', error.message);
  }
}

// Run the script
fixAllGameTranslations();
