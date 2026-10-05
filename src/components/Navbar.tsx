'use client';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        setIsAdmin(data?.role === 'admin');
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        setIsAdmin(data?.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const navLinks = [
    { href: '/', label_en: 'Home', label_kn: 'ಮುಖಪುಟ' },
    { href: '/services', label_en: 'Services', label_kn: 'ಸೇವೆಗಳು' },
    { href: '/about', label_en: 'About', label_kn: 'ನಮ್ಮ ಬಗ್ಗೆ' },
    { href: '/faqs', label_en: 'FAQs', label_kn: 'ಪ್ರಶ್ನೋತ್ತರಗಳು' },
    { href: '/contact', label_en: 'Contact', label_kn: 'ಸಂಪರ್ಕಿಸಿ' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image src="/logo.jpg" alt="SevaSetu Logo" width={40} height={40} className="rounded" />
              <span className="font-bold text-xl text-blue-800 hidden sm:block">SevaSetu</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t(link.label_en, link.label_kn)}
              </Link>
            ))}
            <LanguageSwitcher />
            
            {user ? (
              <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{isAdmin ? 'Admin' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                {t('Login', 'ಲಾಗಿನ್')}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {t(link.label_en, link.label_kn)}
              </Link>
            ))}
            {user ? (
              <Link
                href={isAdmin ? "/admin" : "/dashboard"}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
              >
                {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 mt-4"
              >
                {t('Login', 'ಲಾಗಿನ್')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
