import { createPublicClient } from '@/utils/supabase/public';
import ClientFaqs from './ClientFaqs';

export const revalidate = 60;

export default async function FaqsPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase.from('general_faqs').select('*').eq('active', true).order('display_order', { ascending: true });

  return <ClientFaqs faqs={faqs || []} />;
}
