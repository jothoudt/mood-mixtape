'use client';

import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
  const qp = useSearchParams();
  const err = qp.get('error');
  const msg = qp.get('message');
  return (
    <div style={{ padding: 24 }}>
      <h2>Auth Error</h2>
      <pre>{err || '(no code)'}</pre>
      {msg && <pre>{msg}</pre>}
      <p>Try clearing cookies for 127.0.0.1 and retry.</p>
    </div>
  );
}
