import { createClient } from '@/utils/supabase/server';
import ClientAbout from './ClientAbout';

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();

  return <ClientAbout settings={settings || {}} />;
}
