const fs = require('fs');
const path = require('path');

const gamesDirectory = './public/games_download';

// Working translation widget with proper Google Translate integration
const translationWidget = `
    <!-- Translation Widget - Working Version -->
    <div id="translate-icon" class="translate-icon" onclick="toggleTranslate()">
        <span style="font-size: 18px; color: white;">🌐</span>
    </div>
    
    <div id="translate-dropdown" class="translate-dropdown">
        <div style="margin-bottom: 10px; font-weight: bold; font-size: 14px;">
            Choose Language:
        </div>
        
        <div id="google_translate_element"></div>
    </div>

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
        }
        
        .translate-dropdown {
            position: fixed;
            top: 60px;
            right: 15px;
            z-index: 9999;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            border: 1px solid #ddd;
            min-width: 220px;
            display: none;
        }
        
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        .goog-te-gadget { 
            font-family: inherit !important; 
            font-size: 14px !important;
        }
        .goog-te-combo { 
            width: 100% !important; 
            padding: 8px !important;
            font-size: 14px !important;
            border: 1px solid #ccc !important;
            border-radius: 4px !important;
            margin: 0 !important;
        }
        .goog-te-gadget-simple {
            background: transparent !important;
            border: none !important;
        }
        .goog-te-gadget-icon {
            display: none !important;
        }
    </style>

    <script type="text/javascript">
        let translateOpen = false;
        
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,bn,te,ta,gu,kn,ml,mr,pa,or,as,ur,ne,si,my,th,vi,id,ms,tl,zh,ja,ko,fr,es,pt,de,it,ru,ar,fa,tr,pl,nl,sv,da,no,fi,he,el,hu,cs,sk,ro,bg,hr,sr,sl,et,lv,lt,uk,be,ka,hy,az,kk,ky,uz,tg,mn,bo,km,lo,dz,am,ti,sw,zu,xh,af,ig,yo,ha,ff,wo,sn,rw,lg,ny,st,tn,ts,ve,nr,ss,nd',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
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
`;

function addTranslationToGame(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove any existing translation code
        content = content.replace(/<!-- Translation Widget[\s\S]*?<\/script>/g, '');
        content = content.replace(/<!-- Google Translate[\s\S]*?<\/script>/g, '');
        content = content.replace(/<!-- Language Translate[\s\S]*?<\/div>/g, '');
        content = content.replace(/<style>[\s\S]*?translate[\s\S]*?<\/style>/g, '');
        content = content.replace(/<script[\s\S]*?translate[\s\S]*?<\/script>/g, '');
        
        // Add translation widget after body tag
        if (content.includes('<body>')) {
            content = content.replace('<body>', '<body>' + translationWidget);
        } else if (content.includes('<body ')) {
            const bodyMatch = content.match(/<body[^>]*>/);
            if (bodyMatch) {
                content = content.replace(bodyMatch[0], bodyMatch[0] + translationWidget);
            }
        } else {
            // If no body tag, add at the beginning
            content = translationWidget + content;
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Added translation to ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

function addTranslationToAllGames() {
    try {
        const files = fs.readdirSync(gamesDirectory);
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        console.log(`Found ${htmlFiles.length} HTML game files`);
        console.log('Adding working translation to all games...\n');
        
        htmlFiles.forEach(file => {
            const filePath = path.join(gamesDirectory, file);
            addTranslationToGame(filePath);
        });
        
        console.log(`\n✅ Successfully added translation to ${htmlFiles.length} game files`);
        console.log('All games now have working translation with language selection!');
        
    } catch (error) {
        console.error('Error processing games directory:', error.message);
    }
}

// Run the script
addTranslationToAllGames();
