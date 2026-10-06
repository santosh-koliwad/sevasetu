import { createClient } from '@/utils/supabase/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ClientContact from './ClientContact';

export const revalidate = 60;

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();

  return <ClientContact settings={settings || {}} />;
}
