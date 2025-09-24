import { useEffect } from 'react';
import { Globe } from 'lucide-react';

const SimpleTranslate = () => {
  useEffect(() => {
    // Add Google Translate script to head if not already present
    if (!document.querySelector('#google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }

    // Define the initialization function
    (window as any).googleTranslateElementInit = () => {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,te,ta,gu,kn,ml,mr,pa,or,as,ur,ne,si,my,th,vi,id,ms,tl,zh,ja,ko,fr,es,pt,de,it,ru,ar,fa,tr,pl,nl,sv,da,no,fi,he,el,hu,cs,sk,ro,bg,hr,sr,sl,et,lv,lt,uk,be,ka,hy,az,kk,ky,uz,tg,mn,bo,km,lo,dz,am,ti,sw,zu,xh,af,ig,yo,ha,ff,wo,sn,rw,lg,ny,st,tn,ts,ve,nr,ss,nd',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        );
      }
    };

    // If Google Translate is already loaded, initialize immediately
    if ((window as any).google && (window as any).google.translate) {
      (window as any).googleTranslateElementInit();
    }
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-3 border">
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-blue-600" />
        <div id="google_translate_element"></div>
      </div>
      
      {/* Global styles for Google Translate */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .goog-te-banner-frame {
            display: none !important;
          }
          
          .goog-te-gadget {
            font-family: inherit !important;
            font-size: 14px !important;
          }
          
          .goog-te-combo {
            margin: 0 !important;
            padding: 4px 8px !important;
            border: 1px solid #ccc !important;
            border-radius: 4px !important;
            background: white !important;
            font-size: 14px !important;
          }
          
          body {
            top: 0 !important;
          }
          
          .goog-te-banner-frame.skiptranslate {
            display: none !important;
          }
        `
      }} />
    </div>
  );
};

export default SimpleTranslate;
