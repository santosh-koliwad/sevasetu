'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('whatsapp').eq('id', 1).single();
      if (data?.whatsapp) {
        setWhatsapp(data.whatsapp);
      }
    };
    fetchSettings();
  }, [supabase]);

  if (!whatsapp) return null;

  const handleClick = () => {
    const message = encodeURIComponent("Hello, I would like assistance with your services.");
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-transform"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
