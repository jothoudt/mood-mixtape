'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from './store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className="container mx-auto px-4">
        <SessionProvider>{children}</SessionProvider>
      </div>
    </Provider>
  );
}
