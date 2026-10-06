export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white my-12 rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Disclaimer</h1>
      <div className="prose prose-blue max-w-none text-slate-700 space-y-6">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8 text-amber-900">
          <p className="font-bold text-lg mb-2">Important Notice</p>
          <p><strong>SevaSetu Digital Centre is an independent, private digital service facilitation centre.</strong></p>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Not a Government Entity</h2>
        <p>This website and the SevaSetu Digital Centre are <strong>NOT</strong> affiliated with, endorsed by, or representing the Government of India, the State Government, or any official government agency.</p>
        <p>We are a private business that provides consultation, assistance, and data-entry services to help citizens navigate online applications and digital portals.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Service Facilitation</h2>
        <p>We do not issue certificates, IDs, or official documents. We only assist you in correctly filling out forms, uploading documents, and paying the required fees on the respective official government portals. The approval, rejection, or processing time of any application is entirely at the discretion of the relevant government authority.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Use of Official Logos</h2>
        <p>Any reference to government services or departments on this website is for informational purposes only, to describe the nature of the assistance we provide. We do not use official government emblems or logos in a manner that implies official endorsement.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Information Accuracy</h2>
        <p>While we strive to keep the information on this website accurate and up-to-date, rules and procedures of government services change frequently. We do not warrant the absolute accuracy, completeness, or reliability of the information provided on this site.</p>
      </div>
    </div>
  );
}
