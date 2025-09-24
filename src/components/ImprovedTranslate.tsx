import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
    __googleTranslateInitialized?: boolean;
  }
}

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'ar', name: 'Arabic', native: 'العربية' }
];

const ImprovedTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentLanguage, translatePage, isTranslating } = useTranslation();

  useEffect(() => {
    // Only initialize Google Translate ONCE per page load
    if (window.__googleTranslateInitialized) return;
    window.__googleTranslateInitialized = true;

    // Create hidden translate element if not present
    let translateElement = document.getElementById('google_translate_element_hidden');
    if (!translateElement) {
      translateElement = document.createElement('div');
      translateElement.id = 'google_translate_element_hidden';
      translateElement.style.display = 'none';
      document.body.appendChild(translateElement);
    }

    // Google Translate callback
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        try {
          // Only create widget if not present
          if (!document.querySelector('.goog-te-combo')) {
            new window.google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: languages.map(l => l.code).join(','),
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              multilanguagePage: true
            }, 'google_translate_element_hidden');
          }
          setIsLoaded(true);
          // Auto-apply translation if cookie is set and not 'en'
          const cookies = document.cookie.split(';');
          const translateCookie = cookies.find(cookie => cookie.trim().startsWith('googtrans='));
          if (translateCookie) {
            const langCode = translateCookie.split('=')[1].split('/')[2];
            if (langCode && langCode !== 'en') {
              setTimeout(() => {
                translatePage(langCode);
              }, 300);
            }
          }
        } catch (error) {
          console.error('Error initializing Google Translate:', error);
        }
      }
    };

    // Load Google Translate script if not present
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else {
      // If script already present, call init
      setTimeout(window.googleTranslateElementInit, 100);
    }
    // No cleanup, never remove widget
  }, [translatePage]);

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
        <Globe className="w-5 h-5 text-white" />
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
            minWidth: '220px',
            maxHeight: '300px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
            Choose Language:
          </div>
          {!isLoaded && (
            <div style={{ marginBottom: '10px', color: '#888', fontSize: '13px', textAlign: 'center' }}>
              Loading translation...
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  translatePage(lang.code);
                  setIsOpen(false);
                }}
                disabled={isTranslating || !isLoaded}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: currentLanguage === lang.code ? '#e3f2fd' : 'transparent',
                  color: currentLanguage === lang.code ? '#1976d2' : '#333',
                  cursor: isLoaded ? 'pointer' : 'not-allowed',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  opacity: isLoaded ? 1 : 0.6
                }}
                onMouseEnter={(e) => {
                  if (currentLanguage !== lang.code && isLoaded) {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentLanguage !== lang.code && isLoaded) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ fontWeight: currentLanguage === lang.code ? 'bold' : 'normal' }}>
                  {lang.native}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {lang.name}
                </div>
              </button>
            ))}
          </div>
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
          /* Hide the hidden translate element */
          #google_translate_element_hidden {
            display: none !important;
          }
        `
      }} />
    </>
  );
};

export default ImprovedTranslate;