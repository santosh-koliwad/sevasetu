-- SevaSetu Digital Centre Database Schema

-- 1. Profiles (Customers and Admins)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_kn TEXT NOT NULL,
  description_en TEXT,
  description_kn TEXT,
  icon TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name_en TEXT NOT NULL,
  name_kn TEXT NOT NULL,
  short_description_en TEXT,
  short_description_kn TEXT,
  description_en TEXT,
  description_kn TEXT,
  instructions_en TEXT,
  instructions_kn TEXT,
  processing_time_en TEXT,
  processing_time_kn TEXT,
  fee_information_en TEXT,
  fee_information_kn TEXT,
  icon TEXT,
  image TEXT,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Service Documents (Requirements)
CREATE TABLE public.service_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  document_name_en TEXT NOT NULL,
  document_name_kn TEXT NOT NULL,
  description_en TEXT,
  description_kn TEXT,
  required BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0
);

-- 5. Service FAQs
CREATE TABLE public.service_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  question_en TEXT NOT NULL,
  question_kn TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_kn TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0
);

-- 6. Service Requests
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Completed', 'Cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. General FAQs
CREATE TABLE public.general_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_en TEXT NOT NULL,
  question_kn TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_kn TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0
);

-- 8. Site Settings
CREATE TABLE public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Ensure only one row
  shop_name TEXT DEFAULT 'SevaSetu Digital Centre',
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address_en TEXT,
  address_kn TEXT,
  opening_hours TEXT,
  maps_url TEXT,
  about_en TEXT,
  about_kn TEXT,
  hero_title_en TEXT,
  hero_title_kn TEXT,
  hero_description_en TEXT,
  hero_description_kn TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.general_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can view their own profile, admins can view all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (public.is_admin());

-- Categories: Public read, Admin write
CREATE POLICY "Public can view active categories" ON public.categories FOR SELECT USING (active = TRUE OR public.is_admin());
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (public.is_admin());

-- Services: Public read, Admin write
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (active = TRUE OR public.is_admin());
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE USING (public.is_admin());

-- Service Documents: Public read, Admin write
CREATE POLICY "Public can view service documents" ON public.service_documents FOR SELECT USING (TRUE);
CREATE POLICY "Admins can insert service documents" ON public.service_documents FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update service documents" ON public.service_documents FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete service documents" ON public.service_documents FOR DELETE USING (public.is_admin());

-- Service FAQs: Public read, Admin write
CREATE POLICY "Public can view service FAQs" ON public.service_faqs FOR SELECT USING (active = TRUE OR public.is_admin());
CREATE POLICY "Admins can insert service faqs" ON public.service_faqs FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update service faqs" ON public.service_faqs FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete service faqs" ON public.service_faqs FOR DELETE USING (public.is_admin());

-- General FAQs: Public read, Admin write
CREATE POLICY "Public can view general FAQs" ON public.general_faqs FOR SELECT USING (active = TRUE OR public.is_admin());
CREATE POLICY "Admins can insert general faqs" ON public.general_faqs FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update general faqs" ON public.general_faqs FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete general faqs" ON public.general_faqs FOR DELETE USING (public.is_admin());

-- Site Settings: Public read, Admin write
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (TRUE);
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can insert site settings" ON public.site_settings FOR INSERT WITH CHECK (public.is_admin());

-- Service Requests: Users can insert and read their own, Admins can read all and update
CREATE POLICY "Users can insert own requests" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own requests" ON public.service_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all requests" ON public.service_requests FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update all requests" ON public.service_requests FOR UPDATE USING (public.is_admin());

-- TRIGGER TO AUTO CREATE PROFILE
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'avatar_url',
    'customer'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- INITIAL SEED DATA
INSERT INTO public.site_settings (
  shop_name, phone, whatsapp, email, address_en, address_kn, 
  opening_hours, maps_url, about_en, about_kn, hero_title_en, hero_title_kn, 
  hero_description_en, hero_description_kn
) VALUES (
  'SevaSetu Digital Centre',
  '+91 98765 43210',
  '919876543210',
  'contact@sevasetu.example.com',
  '123 Main Street, Bangalore, Karnataka',
  '೧೨೩ ಮುಖ್ಯ ರಸ್ತೆ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ',
  'Monday - Saturday: 9:00 AM - 7:00 PM',
  'https://maps.google.com',
  'SevaSetu Digital Centre provides convenient assistance with a range of digital, government and citizen services. Our goal is to help customers understand service requirements and complete online processes more easily.',
  'ಸೇವಾ-ಸೇತು ಡಿಜಿಟಲ್ ಕೇಂದ್ರವು ಡಿಜಿಟಲ್, ಸರ್ಕಾರಿ ಮತ್ತು ನಾಗರಿಕ ಸೇವೆಗಳೊಂದಿಗೆ ಅನುಕೂಲಕರ ಸಹಾಯವನ್ನು ಒದಗಿಸುತ್ತದೆ.',
  'Your Trusted Digital Service Centre',
  'ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಡಿಜಿಟಲ್ ಸೇವಾ ಕೇಂದ್ರ',
  'Easy assistance for government, digital and citizen services.',
  'ಸರ್ಕಾರಿ ಮತ್ತು ಡಿಜಿಟಲ್ ಸೇವೆಗಳಿಗೆ ಸುಲಭ ಸಹಾಯ.'
);
