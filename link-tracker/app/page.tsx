'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/shorten/',{
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setShort(data.short);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Cole a URL aqui"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Encurtar
        </button>
      </form>
      {short && (
        <p className="mt-4">
          Link: <a href={short} className="text-blue-500 underline">{short}</a>
        </p>
      )}
    </main>
  );
}
