import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Google Translate if not already loaded
    const initializeGoogleTranslate = () => {
      console.log('Initializing Google Translate...');
      if (window.google && window.google.translate) {
        try {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,te,ta,gu,kn,ml,mr,pa,or,as,ur,ne,si,my,th,vi,id,ms,tl,zh,ja,ko,fr,es,pt,de,it,ru,ar,fa,tr,pl,nl,sv,da,no,fi,he,el,hu,cs,sk,ro,bg,hr,sr,sl,et,lv,lt,uk,be,ka,hy,az,kk,ky,uz,tg,mn,bo,km,lo,dz,am,ti,sw,zu,xh,af,ig,yo,ha,ff,wo,sn,rw,lg,ny,st,tn,ts,ve,nr,ss,nd',
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false,
            multilanguagePage: true
          }, 'google_translate_element');
          setIsLoaded(true);
          console.log('Google Translate initialized successfully');
        } catch (error) {
          console.error('Error initializing Google Translate:', error);
        }
      } else {
        console.log('Google Translate API not yet available');
      }
    };

    // Set up the global callback
    window.googleTranslateElementInit = initializeGoogleTranslate;

    // Load Google Translate script if not already loaded
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      console.log('Loading Google Translate script...');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onload = () => {
        console.log('Google Translate script loaded');
      };
      script.onerror = () => {
        console.error('Failed to load Google Translate script');
      };
      document.head.appendChild(script);
    } else {
      // If script is already loaded, just initialize
      console.log('Google Translate script already exists, initializing...');
      setTimeout(initializeGoogleTranslate, 100);
    }

    return () => {
      // Cleanup: remove the translate element if component unmounts
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-300 shadow-lg">
        <Globe className="w-4 h-4 text-blue-600" />
        <div id="google_translate_element" className="translate-widget"></div>
        {!isLoaded && (
          <span className="text-sm text-gray-600">Loading translator...</span>
        )}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .translate-widget .goog-te-combo {
            background: white !important;
            border: 1px solid #d1d5db !important;
            color: #374151 !important;
            font-size: 14px !important;
            padding: 4px 8px !important;
            border-radius: 4px !important;
            min-width: 120px !important;
          }
          .translate-widget .goog-te-combo option {
            background: white !important;
            color: #374151 !important;
          }
          .translate-widget .goog-te-gadget {
            font-family: inherit !important;
            font-size: 14px !important;
          }
          .translate-widget .goog-te-gadget-simple {
            background: transparent !important;
            border: none !important;
            font-size: 14px !important;
          }
          .translate-widget .goog-te-gadget-simple .goog-te-menu-value {
            color: #374151 !important;
          }
          .translate-widget .goog-te-gadget-simple .goog-te-menu-value span {
            color: #374151 !important;
          }
          .goog-te-banner-frame {
            display: none !important;
          }
          .goog-te-menu-frame {
            max-height: 400px !important;
            overflow-y: auto !important;
          }
          body {
            top: 0px !important;
          }
          .goog-te-banner-frame.skiptranslate {
            display: none !important;
          }
          .goog-te-gadget-icon {
            display: none !important;
          }
        `
      }} />
    </>
  );
};

export default GoogleTranslate;
