import React from 'react';
import '../globals.css';

export default function RootRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca" className="dark">
      <body className="bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}

