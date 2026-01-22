// /app/dashboard/page.tsx
import { Metadata } from 'next';
import Cards from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Cards />
      <RevenueChart />
      <LatestInvoices />
    </div>
  );
}
