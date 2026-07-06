const fs = require('fs');
const path = require('path');

// Embedded CSS styles
const embeddedCSS = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
}

.min-h-screen { min-height: 100vh; }
.bg-gradient-to-br { background: linear-gradient(to bottom right, #1e3a8a, #7c3aed, #4c1d95); }
.p-4 { padding: 1rem; }
.w-full { width: 100%; }
.max-w-4xl { max-width: 56rem; }
.max-w-6xl { max-width: 72rem; }
.max-w-7xl { max-width: 80rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.bg-white\/10 { background-color: rgba(255, 255, 255, 0.1); }
.backdrop-blur-lg { backdrop-filter: blur(16px); }
.rounded-2xl { border-radius: 1rem; }
.rounded-3xl { border-radius: 1.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.p-8 { padding: 2rem; }
.p-6 { padding: 1.5rem; }
.p-4 { padding: 1rem; }
.text-center { text-align: center; }
.text-white { color: white; }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
.border { border-width: 1px; }
.border-white\/20 { border-color: rgba(255, 255, 255, 0.2); }
.w-20 { width: 5rem; }
.h-20 { height: 5rem; }
.mb-6 { margin-bottom: 1.5rem; }
.text-yellow-400 { color: #fbbf24; }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.font-bold { font-weight: 700; }
.mb-4 { margin-bottom: 1rem; }
.bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
.from-yellow-400 { --tw-gradient-from: #fbbf24; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(251, 191, 36, 0)); }
.to-orange-500 { --tw-gradient-to: #f97316; }
.bg-clip-text { background-clip: text; }
.text-transparent { color: transparent; }
.grid { display: grid; }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.gap-6 { gap: 1.5rem; }
.gap-4 { gap: 1rem; }
.gap-3 { gap: 0.75rem; }
.gap-2 { gap: 0.5rem; }
.bg-black\/20 { background-color: rgba(0, 0, 0, 0.2); }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-blue-300 { color: #93c5fd; }
.text-green-300 { color: #86efac; }
.text-violet-300 { color: #c4b5fd; }
.text-emerald-300 { color: #6ee7b7; }
.opacity-80 { opacity: 0.8; }
.from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0)); }
.to-purple-600 { --tw-gradient-to: #9333ea; }
.hover\\:from-blue-700:hover { --tw-gradient-from: #1d4ed8; }
.hover\\:to-purple-700:hover { --tw-gradient-to: #7c2d12; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.rounded-full { border-radius: 9999px; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.hover\\:scale-105:hover { --tw-scale-x: 1.05; --tw-scale-y: 1.05; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }
.flex-1 { flex: 1 1 0%; }
.mb-1 { margin-bottom: 0.25rem; }
.text-red-300 { color: #fca5a5; }
.h-3 { height: 0.75rem; }
.from-blue-400 { --tw-gradient-from: #60a5fa; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(96, 165, 250, 0)); }
.to-purple-500 { --tw-gradient-to: #a855f7; }
.duration-300 { transition-duration: 300ms; }
.w-10 { width: 2.5rem; }
.h-10 { height: 2.5rem; }
.from-blue-500 { --tw-gradient-from: #3b82f6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0)); }
.to-purple-600 { --tw-gradient-to: #9333ea; }
.bg-blue-500\/20 { background-color: rgba(59, 130, 246, 0.2); }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.border-blue-400\/30 { border-color: rgba(96, 165, 250, 0.3); }
.leading-relaxed { line-height: 1.625; }
.space-y-3 > * + * { margin-top: 0.75rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }
.hover\\:scale-\\[1\\.02\\]:hover { --tw-scale-x: 1.02; --tw-scale-y: 1.02; }
.font-medium { font-weight: 500; }
.bg-green-500\/30 { background-color: rgba(34, 197, 94, 0.3); }
.border-2 { border-width: 2px; }
.border-green-400 { border-color: #4ade80; }
.text-green-100 { color: #dcfce7; }
.bg-red-500\/30 { background-color: rgba(239, 68, 68, 0.3); }
.border-red-400 { border-color: #f87171; }
.text-red-100 { color: #fee2e2; }
.bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
.border-white\/20 { border-color: rgba(255, 255, 255, 0.2); }
.text-white\/70 { color: rgba(255, 255, 255, 0.7); }
.bg-white\/10 { background-color: rgba(255, 255, 255, 0.1); }
.hover\\:bg-white\/20:hover { background-color: rgba(255, 255, 255, 0.2); }
.w-8 { width: 2rem; }
.h-8 { height: 2rem; }
.bg-white\/20 { background-color: rgba(255, 255, 255, 0.2); }
.ml-auto { margin-left: auto; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
.text-green-400 { color: #4ade80; }
.text-red-400 { color: #f87171; }
.text-green-300 { color: #86efac; }
.text-red-300 { color: #fca5a5; }
.from-green-500\/20 { --tw-gradient-from: rgba(34, 197, 94, 0.2); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(34, 197, 94, 0.2)); }
.to-blue-500\/20 { --tw-gradient-to: rgba(59, 130, 246, 0.2); }
.p-3 { padding: 0.75rem; }
.border-green-400\/30 { border-color: rgba(74, 222, 128, 0.3); }
button { cursor: pointer; border: none; outline: none; }
button:disabled { cursor: not-allowed; opacity: 0.6; }
button:hover:not(:disabled) { transform: scale(1.02); }
input { outline: none; }
input:focus { outline: 2px solid #3b82f6; outline-offset: 2px; }
`;

// Grade 9 HTML files to fix
const files = [
  'matter9.html', 'cell9.html', 'motion9.html', 'gra9.html', 
  'sou9.html', 'nat9.html', 'fr9.html'
];

files.forEach(filename => {
  const filePath = path.join('src/components/games_download', filename);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace CDN links with embedded CSS
    content = content.replace(
      /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g,
      ''
    );
    content = content.replace(
      /<link[^>]*href="https:\/\/unpkg\.com\/lucide[^"]*"[^>]*>/g,
      ''
    );
    
    // Add embedded CSS after <head>
    content = content.replace(
      /<head>/,
      `<head>\n<style>${embeddedCSS}</style>`
    );
    
    // Replace Lucide icons with emojis
    content = content.replace(/<i class="lucide lucide-[^"]*"[^>]*><\/i>/g, '⚛️');
    content = content.replace(/<Atom[^>]*\/>/g, '⚛️');
    content = content.replace(/<Microscope[^>]*\/>/g, '🔬');
    content = content.replace(/<Target[^>]*\/>/g, '🎯');
    content = content.replace(/<RotateCcw[^>]*\/>/g, '🔄');
    content = content.replace(/<CheckCircle[^>]*\/>/g, '✅');
    content = content.replace(/<XCircle[^>]*\/>/g, '❌');
    content = content.replace(/<Sparkles[^>]*\/>/g, '✨');
    content = content.replace(/<Award[^>]*\/>/g, '🏆');
    content = content.replace(/<Trophy[^>]*\/>/g, '🏆');
    content = content.replace(/<Volume2[^>]*\/>/g, '🔊');
    content = content.replace(/<Leaf[^>]*\/>/g, '🍃');
    content = content.replace(/<Wheat[^>]*\/>/g, '🌾');
    content = content.replace(/<Zap[^>]*\/>/g, '⚡');
    content = content.replace(/<Shuffle[^>]*\/>/g, '🔀');
    content = content.replace(/<Play[^>]*\/>/g, '▶️');
    content = content.replace(/<Pause[^>]*\/>/g, '⏸️');
    content = content.replace(/<Recycle[^>]*\/>/g, '♻️');
    content = content.replace(/<Factory[^>]*\/>/g, '🏭');
    content = content.replace(/<Sprout[^>]*\/>/g, '🌱');
    content = content.replace(/<Droplets[^>]*\/>/g, '💧');
    content = content.replace(/<Lightbulb[^>]*\/>/g, '💡');
    content = content.replace(/<Check[^>]*\/>/g, '✅');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${filename}`);
  } else {
    console.log(`File not found: ${filename}`);
  }
});

console.log('All Grade 9 Science HTML files have been fixed!');
