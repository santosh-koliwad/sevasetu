export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white my-12 rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none text-slate-700 space-y-6">
        <p><strong>Last Updated:</strong> October 2026</p>
        <p>This Privacy Policy describes how SevaSetu Digital Centre collects, uses, and protects your information when you use our website and services.</p>
        
        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
        <p>When you use our services, we may collect the following information:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Personal Information:</strong> Name, email address, phone number, and any other details you provide when submitting a service request.</li>
          <li><strong>Authentication Data:</strong> We use Google Login for authentication. We receive your basic profile information (name and email) from Google.</li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Process and fulfill your service requests.</li>
          <li>Communicate with you regarding the status of your applications.</li>
          <li>Improve our website and customer service.</li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information. We do not sell or share your personal data with third parties for marketing purposes. Your data is stored securely using Supabase infrastructure.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Third-Party Links</h2>
        <p>Our website may contain links to official government portals. We are not responsible for the privacy practices or content of those external sites.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at our centre or through the contact details provided on our website.</p>
      </div>
    </div>
  );
}
