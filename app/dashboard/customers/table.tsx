// /app/ui/customers/table.tsx
'use client';

import { FormattedCustomersTable } from '@/app/lib/definitions';
import Image from 'next/image';
import Search from '@/app/ui/search';


type CustomersTableProps = {
  customers: FormattedCustomersTable[];
  initialQuery?: string;
};

export default function Table({ customers, initialQuery }: CustomersTableProps) {
  return (
    <div className="w-full">
      {/* Search inside the table */}
      <div className="mb-6">
        <Search placeholder="Search customers..." initialQuery={initialQuery} />
      </div>

      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th>Name</th>
            <th>Email</th>
            <th>Total Invoices</th>
            <th>Pending</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b border-gray-100">
              <td className="px-4 py-2 flex items-center gap-2">
                {customer.image_url && (
                  <Image
                    src={customer.image_url}
                    alt={customer.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                {customer.name}
              </td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.total_invoices}</td>
              <td className="px-4 py-2">{customer.total_pending}</td>
              <td className="px-4 py-2">{customer.total_paid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
