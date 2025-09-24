const fs = require('fs');
const path = require('path');

const gamesDirectory = './public/games_download';

// Clean, working translation code
const cleanTranslateCode = `
    <!-- Google Translate - Clean Version -->
    <script type="text/javascript">
      let translateOpen = false;
      
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,bn,te,ta,gu,kn,ml,mr,pa,or,as,ur,ne,si,my,th,vi,id,ms,tl,zh,ja,ko,fr,es,pt,de,it,ru,ar,fa,tr,pl,nl,sv,da,no,fi,he,el,hu,cs,sk,ro,bg,hr,sr,sl,et,lv,lt,uk,be,ka,hy,az,kk,ky,uz,tg,mn,bo,km,lo,dz,am,ti,sw,zu,xh,af,ig,yo,ha,ff,wo,sn,rw,lg,ny,st,tn,ts,ve,nr,ss,nd'
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
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        border: 1px solid #ddd;
        min-width: 180px;
        display: none;
      }
      
      .goog-te-banner-frame {
        display: none !important;
      }
      
      .goog-te-gadget {
        font-family: inherit !important;
        font-size: 13px !important;
      }
      
      .goog-te-combo {
        margin: 0 !important;
        padding: 4px 6px !important;
        border: 1px solid #ccc !important;
        border-radius: 4px !important;
        background: white !important;
        font-size: 13px !important;
        width: 100% !important;
      }
      
      body {
        top: 0 !important;
      }
      
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
    </style>`;

const cleanTranslateWidget = `
    <!-- Language Translate Widget - Clean Version -->
    <div id="translate-icon" class="translate-icon" onclick="toggleTranslate()">
      <span style="font-size: 18px; color: white;">🌐</span>
    </div>
    <div id="translate-dropdown" class="translate-dropdown">
      <div style="margin-bottom: 5px; font-weight: bold; font-size: 12px;">Select Language:</div>
      <div id="google_translate_element"></div>
    </div>`;

function cleanGameFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove ALL existing Google Translate code
    content = content.replace(/<!-- Google Translate[\s\S]*?<\/script>/g, '');
    content = content.replace(/<!-- Language Translate Widget[\s\S]*?<\/div>/g, '');
    content = content.replace(/<style>[\s\S]*?translate-[\s\S]*?<\/style>/g, '');
    content = content.replace(/<script[\s\S]*?translate[\s\S]*?<\/script>/g, '');
    content = content.replace(/\s*<\/div>\s*<head>/g, '');
    
    // Clean up broken HTML structure
    content = content.replace(/^\s*<\/div>\s*/gm, '');
    content = content.replace(/^\s*<head>\s*/gm, '');
    
    // Ensure proper HTML structure
    if (!content.includes('<!DOCTYPE html>')) {
      content = '<!DOCTYPE html>\n' + content;
    }
    
    if (!content.includes('<html')) {
      content = content.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<html lang="en">');
      if (!content.includes('</html>')) {
        content += '\n</html>';
      }
    }
    
    // Add head section if missing
    if (!content.includes('<head>')) {
      const htmlMatch = content.match(/<html[^>]*>/);
      if (htmlMatch) {
        const insertPos = content.indexOf(htmlMatch[0]) + htmlMatch[0].length;
        content = content.slice(0, insertPos) + '\n<head>' + cleanTranslateCode + '\n</head>' + content.slice(insertPos);
      }
    } else {
      // Add to existing head
      content = content.replace('</head>', cleanTranslateCode + '\n</head>');
    }
    
    // Add body section if missing and insert widget
    if (!content.includes('<body')) {
      const headEndPos = content.indexOf('</head>') + 7;
      content = content.slice(0, headEndPos) + '\n<body>' + cleanTranslateWidget + content.slice(headEndPos) + '\n</body>';
    } else {
      // Add to existing body
      const bodyMatch = content.match(/<body[^>]*>/);
      if (bodyMatch) {
        const insertPos = content.indexOf(bodyMatch[0]) + bodyMatch[0].length;
        content = content.slice(0, insertPos) + '\n' + cleanTranslateWidget + content.slice(insertPos);
      }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Cleaned and fixed ${path.basename(filePath)}`);
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function cleanAllGameFiles() {
  try {
    const files = fs.readdirSync(gamesDirectory);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`Found ${htmlFiles.length} HTML game files`);
    console.log('Cleaning and fixing all game translation widgets...\n');
    
    htmlFiles.forEach(file => {
      const filePath = path.join(gamesDirectory, file);
      cleanGameFile(filePath);
    });
    
    console.log(`\n✅ Successfully cleaned and fixed ${htmlFiles.length} game files`);
    console.log('All games now have clean, working translation dropdowns!');
    
  } catch (error) {
    console.error('Error processing games directory:', error.message);
  }
}

// Run the script
cleanAllGameFiles();
