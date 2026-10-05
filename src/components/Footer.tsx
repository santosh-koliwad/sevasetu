'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-4">SevaSetu Digital Centre</h3>
            <p className="text-sm text-slate-400 mb-4">
              {t('Digital assistance made simpler.', 'ಡಿಜಿಟಲ್ ಸಹಾಯವನ್ನು ಸರಳವಾಗಿಸಲಾಗಿದೆ.')}
            </p>
            <p className="text-xs text-slate-500">
              {t('Independent Digital Service Centre', 'ಸ್ವತಂತ್ರ ಡಿಜಿಟಲ್ ಸೇವಾ ಕೇಂದ್ರ')}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">{t('Quick Links', 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">{t('Home', 'ಮುಖಪುಟ')}</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">{t('Services', 'ಸೇವೆಗಳು')}</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">{t('About Us', 'ನಮ್ಮ ಬಗ್ಗೆ')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('Contact', 'ಸಂಪರ್ಕಿಸಿ')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">{t('Legal', 'ಕಾನೂನು')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">{t('Disclaimer', 'ಹಕ್ಕುತ್ಯಾಗ')}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t(
                'This website is operated by an independent digital service centre and is not the official website of the Government of India or any government department. Services are provided as assistance/guidance through applicable official portals and processes.',
                'ಈ ವೆಬ್‌ಸೈಟ್ ಸ್ವತಂತ್ರ ಡಿಜಿಟಲ್ ಸೇವಾ ಕೇಂದ್ರದಿಂದ ನಿರ್ವಹಿಸಲ್ಪಡುತ್ತದೆ ಮತ್ತು ಇದು ಭಾರತ ಸರ್ಕಾರ ಅಥವಾ ಯಾವುದೇ ಸರ್ಕಾರಿ ಇಲಾಖೆಯ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಅಲ್ಲ. ಅನ್ವಯವಾಗುವ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳು ಮತ್ತು ಪ್ರಕ್ರಿಯೆಗಳ ಮೂಲಕ ಸಹಾಯ/ಮಾರ್ಗದರ್ಶನವಾಗಿ ಸೇವೆಗಳನ್ನು ಒದಗಿಸಲಾಗುತ್ತದೆ.'
              )}
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SevaSetu Digital Centre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
