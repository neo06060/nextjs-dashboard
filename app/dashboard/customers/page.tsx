// /app/dashboard/customers/page.tsx
import { Metadata } from 'next';
import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTableSkeleton from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Customers',
};

type PageProps = {
  searchParams?: Promise<{ query?: string }>;
};

export default async function CustomersPage({ searchParams }: PageProps) {
  // Next.js 16 App Router passes searchParams as a Promise
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query ?? '';

  // Fetch filtered customers
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      {/* Render only the table; search bar is handled elsewhere */}
      <Suspense fallback={<CustomersTableSkeleton />}>
        <Table customers={customers ?? []} />
      </Suspense>
    </div>
  );
}
