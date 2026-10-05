import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, CheckCircle2, MapPin } from 'lucide-react';
import ClientHome from './ClientHome';

export default async function Home() {
  const supabase = await createClient();
  
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();
  const { data: categories } = await supabase.from('categories').select('*').eq('active', true).order('created_at', { ascending: true }).limit(8);
  const { data: popularServices } = await supabase.from('services').select('*, categories(name_en, name_kn)').eq('active', true).eq('featured', true).limit(6);

  return (
    <div className="flex flex-col min-h-screen">
      <ClientHome 
        settings={settings} 
        categories={categories || []} 
        popularServices={popularServices || []} 
      />
    </div>
  );
}
