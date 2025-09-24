import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

let globalTranslateInitialized = false;
let translateElementCounter = 0;

const GlobalTranslate = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [elementId] = useState(() => `google_translate_element_${++translateElementCounter}`);

  useEffect(() => {
    const initializeGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        try {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,te,ta,gu,kn,ml,mr,pa,or,as,ur,ne,si,my,th,vi,id,ms,tl,zh,ja,ko,fr,es,pt,de,it,ru,ar,fa,tr,pl,nl,sv,da,no,fi,he,el,hu,cs,sk,ro,bg,hr,sr,sl,et,lv,lt,uk,be,ka,hy,az,kk,ky,uz,tg,mn,bo,km,lo,dz,am,ti,sw,zu,xh,af,ig,yo,ha,ff,wo,sn,rw,lg,ny,st,tn,ts,ve,nr,ss,nd',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          }, elementId);
          setIsLoaded(true);
        } catch (error) {
          console.error('Error initializing Google Translate:', error);
        }
      }
    };

    // Only load the script once globally
    if (!globalTranslateInitialized) {
      globalTranslateInitialized = true;
      
      // Set up global callback
      (window as any).googleTranslateElementInit = () => {
        // Initialize all translate elements on the page
        const elements = document.querySelectorAll('[id^="google_translate_element_"]');
        elements.forEach((element) => {
          if (element.innerHTML === '') {
            try {
              new (window as any).google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,bn,te,ta,gu,kn,ml,mr,pa,or,as,ur,ne,si,my,th,vi,id,ms,tl,zh,ja,ko,fr,es,pt,de,it,ru,ar,fa,tr,pl,nl,sv,da,no,fi,he,el,hu,cs,sk,ro,bg,hr,sr,sl,et,lv,lt,uk,be,ka,hy,az,kk,ky,uz,tg,mn,bo,km,lo,dz,am,ti,sw,zu,xh,af,ig,yo,ha,ff,wo,sn,rw,lg,ny,st,tn,ts,ve,nr,ss,nd',
                layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
                multilanguagePage: true
              }, element.id);
            } catch (error) {
              console.error('Error initializing translate element:', error);
            }
          }
        });
      };

      // Load script if not already present
      if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
      }
    } else {
      // Script already loaded, just initialize this element
      setTimeout(() => {
        if ((window as any).google && (window as any).google.translate) {
          initializeGoogleTranslate();
        }
      }, 500);
    }

    return () => {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = '';
      }
    };
  }, [elementId]);

  return (
    <>
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 border flex items-center gap-2 min-w-[200px]">
        <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <div id={elementId} className="flex-1"></div>
        {!isLoaded && (
          <span className="text-xs text-gray-500">Loading...</span>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .goog-te-banner-frame {
            display: none !important;
          }
          
          .goog-te-gadget {
            font-family: inherit !important;
            font-size: 13px !important;
            color: #374151 !important;
          }
          
          .goog-te-combo {
            margin: 0 !important;
            padding: 2px 6px !important;
            border: 1px solid #d1d5db !important;
            border-radius: 4px !important;
            background: white !important;
            font-size: 13px !important;
            color: #374151 !important;
            width: 100% !important;
            min-width: 120px !important;
          }
          
          .goog-te-gadget-simple {
            background: transparent !important;
            border: none !important;
            font-size: 13px !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value {
            color: #374151 !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value span {
            color: #374151 !important;
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
          
          .goog-te-menu-frame {
            max-height: 300px !important;
            overflow-y: auto !important;
          }
        `
      }} />
    </>
  );
};

export default GlobalTranslate;
