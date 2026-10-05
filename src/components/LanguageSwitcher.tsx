'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <button
        onClick={() => setLanguage('en')}
        className={`text-sm font-medium px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        English
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => setLanguage('kn')}
        className={`text-sm font-medium px-2 py-1 rounded transition-colors ${language === 'kn' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}
