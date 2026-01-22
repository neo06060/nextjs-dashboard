// /app/ui/search.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchProps {
  placeholder?: string;
  initialQuery?: string;
}

export default function Search({ placeholder = '', initialQuery = '' }: SearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the same page with ?query=...
    router.push(`?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded border px-2 py-1 flex-grow"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 transition"
      >
        Search
      </button>
    </form>
  );
}
