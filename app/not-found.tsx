import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body className="min-h-screen bg-bg text-text grid place-items-center font-sans">
        <div className="text-center px-6">
          <div className="font-display tracking-widest2 text-accent text-7xl mb-2">404</div>
          <p className="text-muted mb-6">This page doesn&apos;t exist.</p>
          <Link href="/" className="btn-primary">Go home</Link>
        </div>
      </body>
    </html>
  );
}
