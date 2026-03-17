import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ky', name: 'Кыргызча', flag: '🇰🇬' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="language-switcher">
      <button className="language-switcher-btn">
        <span className="lang-flag">{currentLanguage.flag}</span>
        <span className="lang-name">{currentLanguage.name}</span>
        <ChevronDown size={14} className="lang-icon" />
      </button>
      <div className="language-dropdown">
        {languages.map((lng) => (
          <button
            key={lng.code}
            className={`language-option ${i18n.language === lng.code ? 'active' : ''}`}
            onClick={() => i18n.changeLanguage(lng.code)}
          >
            <span className="lang-flag">{lng.flag}</span>
            <span className="lang-name">{lng.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
