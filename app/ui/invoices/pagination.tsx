'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 text-sm text-gray-400"
              >
                ...
              </span>
            );
          }

          return (
            <Link
              key={index}
              href={createPageURL(page)}
              className={clsx(
                'inline-flex items-center px-4 py-2 text-sm border',
                {
                  'z-10 bg-blue-600 text-white border-blue-600':
                    page === currentPage,
                  'text-gray-900 border-gray-200 hover:bg-gray-100':
                    page !== currentPage,
                },
              )}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  disabled,
}: {
  href: string;
  direction: 'left' | 'right';
  disabled?: boolean;
}) {
  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return disabled ? (
    <div className="inline-flex items-center px-4 py-2 text-gray-400">
      {icon}
    </div>
  ) : (
    <Link
      href={href}
      className="inline-flex items-center px-4 py-2 border border-gray-200 hover:bg-gray-100"
    >
      {icon}
    </Link>
  );
}
