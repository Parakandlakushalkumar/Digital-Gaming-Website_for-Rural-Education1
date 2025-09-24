import { useState, useEffect } from 'react';

const BasicTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const translatePage = (langCode: string) => {
    if (!langCode) return;
    
    // Use Google Translate's cookie-based method for same-page translation
    const googleTranslateCookie = `googtrans=/en/${langCode}`;
    document.cookie = googleTranslateCookie;
    
    // Instead of reloading, trigger Google Translate to translate the page
    if (window.google && window.google.translate) {
      // Find the Google Translate element and trigger translation
      const translateElement = document.querySelector('.goog-te-combo');
      if (translateElement) {
        // Set the language and trigger translation
        (translateElement as HTMLSelectElement).value = langCode;
        translateElement.dispatchEvent(new Event('change'));
      }
    } else {
      // If Google Translate is not loaded yet, just set the cookie
      // The translation will be applied when the page loads
      console.log('Google Translate not loaded yet, cookie set for next page load');
    }
  };

  return (
    <>
      {/* Small floating icon */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '15px',
          right: '15px',
          zIndex: 10000,
          width: '40px',
          height: '40px',
          backgroundColor: '#4285f4',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <span style={{ fontSize: '18px', color: 'white' }}>🌐</span>
      </div>

      {/* Translation dropdown - only shows when clicked */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '60px',
            right: '15px',
            zIndex: 9999,
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            border: '1px solid #ddd',
            minWidth: '220px'
          }}
        >
          <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
            Choose Language:
          </div>
          <select 
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#000',
              fontWeight: 'normal'
            }}
            onChange={(e) => translatePage(e.target.value)}
            defaultValue=""
          >
            <option value="" style={{color: '#000'}}>Select Language</option>
            <option value="hi" style={{color: '#000'}}>Hindi (हिंदी)</option>
            <option value="bn" style={{color: '#000'}}>Bengali (বাংলা)</option>
            <option value="te" style={{color: '#000'}}>Telugu (తెలుగు)</option>
            <option value="ta" style={{color: '#000'}}>Tamil (தமிழ்)</option>
            <option value="gu" style={{color: '#000'}}>Gujarati (ગુજરાતી)</option>
            <option value="kn" style={{color: '#000'}}>Kannada (ಕನ್ನಡ)</option>
            <option value="ml" style={{color: '#000'}}>Malayalam (മലയാളം)</option>
            <option value="mr" style={{color: '#000'}}>Marathi (मराठी)</option>
            <option value="pa" style={{color: '#000'}}>Punjabi (ਪੰਜਾਬੀ)</option>
            <option value="ur" style={{color: '#000'}}>Urdu (اردو)</option>
            <option value="es" style={{color: '#000'}}>Spanish (Español)</option>
            <option value="fr" style={{color: '#000'}}>French (Français)</option>
            <option value="de" style={{color: '#000'}}>German (Deutsch)</option>
            <option value="it" style={{color: '#000'}}>Italian (Italiano)</option>
            <option value="pt" style={{color: '#000'}}>Portuguese (Português)</option>
            <option value="ru" style={{color: '#000'}}>Russian (Русский)</option>
            <option value="ja" style={{color: '#000'}}>Japanese (日本語)</option>
            <option value="ko" style={{color: '#000'}}>Korean (한국어)</option>
            <option value="zh" style={{color: '#000'}}>Chinese (中文)</option>
            <option value="ar" style={{color: '#000'}}>Arabic (العربية)</option>
            <option value="en" style={{color: '#000'}}>English (Reset)</option>
          </select>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998
          }}
        />
      )}

      {/* Global styles to hide Google Translate feedback */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .goog-te-banner-frame {
            display: none !important;
          }
          
          .goog-te-banner-frame.skiptranslate {
            display: none !important;
          }
          
          body {
            top: 0 !important;
          }
          
          /* Hide feedback rating elements */
          .goog-te-ftab {
            display: none !important;
          }
          
          .goog-te-ftab-float {
            display: none !important;
          }
          
          .goog-te-balloon-frame {
            display: none !important;
          }
          
          .goog-te-menu-frame {
            display: none !important;
          }
          
          /* Hide "Rate this translation" and feedback elements */
          div[id*="goog-gt-"] {
            display: none !important;
          }
          
          .goog-tooltip {
            display: none !important;
          }
          
          .goog-tooltip:hover {
            display: none !important;
          }
          
          .goog-text-highlight {
            background: none !important;
            box-shadow: none !important;
          }
        `
      }} />
    </>
  );
};

export default BasicTranslate;
