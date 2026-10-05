import { createClient } from '@/utils/supabase/server';
import ClientFaqs from './ClientFaqs';

export default async function FaqsPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase.from('general_faqs').select('*').eq('active', true).order('display_order', { ascending: true });

  return <ClientFaqs faqs={faqs || []} />;
}
