'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    totalServices: 0,
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalCustomers: 0
  });
  const [recentRequests, setRecentRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: sCount }, { count: rCount }, { count: pCount }, { count: cCount }, { count: uCount }] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('service_requests').select('*', { count: 'exact', head: true }),
        supabase.from('service_requests').select('*', { count: 'exact', head: true }).in('status', ['New', 'In Progress', 'Contacted']),
        supabase.from('service_requests').select('*', { count: 'exact', head: true }).eq('status', 'Completed'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer')
      ]);

      setStats({
        totalServices: sCount || 0,
        totalRequests: rCount || 0,
        pendingRequests: pCount || 0,
        completedRequests: cCount || 0,
        totalCustomers: uCount || 0
      });

      const { data } = await supabase
        .from('service_requests')
        .select('*, services(name_en)')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (data) setRecentRequests(data);
    };

    fetchStats();
  }, [supabase]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Pending Requests</h3>
            <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg"><Clock className="w-5 h-5" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.pendingRequests}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Completed Requests</h3>
            <div className="bg-green-100 text-green-600 p-2 rounded-lg"><CheckCircle className="w-5 h-5" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.completedRequests}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Active Services</h3>
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><FileText className="w-5 h-5" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.totalServices}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Customers</h3>
            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg"><Users className="w-5 h-5" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.totalCustomers}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Recent Requests</h2>
          <Link href="/admin/requests" className="text-sm font-medium text-blue-600 hover:text-blue-800">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Service</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4">
                    <p className="font-medium text-slate-900">{req.customer_name}</p>
                    <p className="text-xs text-slate-500">{req.mobile}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-700">{req.services?.name_en}</td>
                  <td className="p-4 text-sm text-slate-500">{new Date(req.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      req.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      req.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentRequests.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">No recent requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
