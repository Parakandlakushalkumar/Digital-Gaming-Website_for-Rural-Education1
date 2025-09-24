import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TranslationContextType {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  translatePage: (langCode: string) => void;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // Check for existing translation cookie on mount
    const cookies = document.cookie.split(';');
    const translateCookie = cookies.find(cookie => cookie.trim().startsWith('googtrans='));
    if (translateCookie) {
      const langCode = translateCookie.split('=')[1].split('/')[2];
      if (langCode && langCode !== 'en') {
        setCurrentLanguage(langCode);
      }
    }
  }, []);

  const translatePage = (langCode: string) => {
    if (!langCode || langCode === currentLanguage) return;

    setIsTranslating(true);
    setCurrentLanguage(langCode);

    // Use Google Translate's cookie-based method
    const googleTranslateCookie = `googtrans=/en/${langCode}`;
    document.cookie = googleTranslateCookie;

    // Wait for DOM and widget to be ready before triggering translation
    const tryTranslate = () => {
      if (window.google && window.google.translate) {
        try {
          const translateSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (translateSelect) {
            translateSelect.value = langCode;
            translateSelect.dispatchEvent(new Event('change'));
          } else {
            const translateInstance = window.google.translate.TranslateElement.getInstance();
            if (translateInstance) {
              translateInstance.showBanner(false);
              setTimeout(() => {
                const body = document.body;
                if (body) {
                  body.classList.add('translated-ltr');
                  body.setAttribute('dir', 'ltr');
                }
              }, 100);
            }
          }
        } catch (error) {
          console.error('Error triggering translation:', error);
          console.log('Translation will be applied on next page load');
        }
        setTimeout(() => {
          setIsTranslating(false);
        }, 1000);
      } else {
        // Retry after short delay if widget not ready
        setTimeout(tryTranslate, 300);
      }
    };
    // Add a delay to allow React navigation/rendering to finish
    setTimeout(tryTranslate, 400);
  };

  const value: TranslationContextType = {
    currentLanguage,
    setCurrentLanguage,
    translatePage,
    isTranslating
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
