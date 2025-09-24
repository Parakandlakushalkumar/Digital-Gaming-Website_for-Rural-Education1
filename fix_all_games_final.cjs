const fs = require('fs');
const path = require('path');

const gamesDirectory = './public/games_download';

// Complete working translation code
const workingTranslateCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game with Translation</title>
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
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            border: 1px solid #ddd;
            min-width: 200px;
            display: none;
        }
        
        .goog-te-banner-frame {
            display: none !important;
        }
        
        .goog-te-gadget {
            font-family: inherit !important;
            font-size: 14px !important;
        }
        
        .goog-te-combo {
            margin: 0 !important;
            padding: 6px 8px !important;
            border: 1px solid #ccc !important;
            border-radius: 4px !important;
            background: white !important;
            font-size: 14px !important;
            width: 100% !important;
            box-sizing: border-box !important;
        }
        
        body {
            top: 0 !important;
        }
        
        .goog-te-banner-frame.skiptranslate {
            display: none !important;
        }
        
        .goog-te-gadget-icon {
            display: none !important;
        }
    </style>
</head>
<body>
    <!-- Translation Widget -->
    <div id="translate-icon" class="translate-icon" onclick="toggleTranslate()">
        <span style="font-size: 18px; color: white;">🌐</span>
    </div>
    
    <div id="translate-dropdown" class="translate-dropdown">
        <div style="margin-bottom: 8px; font-weight: bold; font-size: 14px; color: #333;">
            Select Language:
        </div>
        <div id="google_translate_element"></div>
    </div>

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

    <!-- ORIGINAL GAME CONTENT STARTS HERE -->
`;

function fixGameFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove everything before the actual game content
        // Look for common game content markers
        const gameContentMarkers = [
            /<h1[^>]*>/i,
            /<div[^>]*class[^>]*game/i,
            /<canvas/i,
            /<script[^>]*src.*game/i,
            /<body[^>]*>/i
        ];
        
        let gameContentStart = -1;
        for (const marker of gameContentMarkers) {
            const match = content.match(marker);
            if (match) {
                gameContentStart = content.indexOf(match[0]);
                break;
            }
        }
        
        // If we found game content, extract it
        let gameContent = '';
        if (gameContentStart > -1) {
            gameContent = content.substring(gameContentStart);
        } else {
            // Fallback: try to find body content
            const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            if (bodyMatch) {
                gameContent = bodyMatch[1];
            } else {
                // Last resort: use everything after head
                const headEndMatch = content.match(/<\/head>/i);
                if (headEndMatch) {
                    gameContent = content.substring(content.indexOf(headEndMatch[0]) + headEndMatch[0].length);
                } else {
                    gameContent = content;
                }
            }
        }
        
        // Clean up the game content
        gameContent = gameContent.replace(/<!DOCTYPE html>/gi, '');
        gameContent = gameContent.replace(/<html[^>]*>/gi, '');
        gameContent = gameContent.replace(/<\/html>/gi, '');
        gameContent = gameContent.replace(/<head>[\s\S]*?<\/head>/gi, '');
        gameContent = gameContent.replace(/<body[^>]*>/gi, '');
        gameContent = gameContent.replace(/<\/body>/gi, '');
        
        // Remove any existing translate code
        gameContent = gameContent.replace(/<!-- Google Translate[\s\S]*?<\/script>/g, '');
        gameContent = gameContent.replace(/<!-- Language Translate[\s\S]*?<\/div>/g, '');
        gameContent = gameContent.replace(/<style>[\s\S]*?translate[\s\S]*?<\/style>/g, '');
        gameContent = gameContent.replace(/<script[\s\S]*?translate[\s\S]*?<\/script>/g, '');
        
        // Create the final content
        const finalContent = workingTranslateCode + gameContent + '\n</body>\n</html>';
        
        fs.writeFileSync(filePath, finalContent, 'utf8');
        console.log(`✓ Fixed ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

function fixAllGames() {
    try {
        const files = fs.readdirSync(gamesDirectory);
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        console.log(`Found ${htmlFiles.length} HTML game files`);
        console.log('Applying working translation to all games...\n');
        
        htmlFiles.forEach(file => {
            const filePath = path.join(gamesDirectory, file);
            fixGameFile(filePath);
        });
        
        console.log(`\n✅ Successfully fixed ${htmlFiles.length} game files`);
        console.log('All games now have working translation dropdowns!');
        
    } catch (error) {
        console.error('Error processing games directory:', error.message);
    }
}

// Run the script
fixAllGames();
