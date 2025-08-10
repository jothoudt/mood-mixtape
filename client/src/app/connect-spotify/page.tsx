'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function ConnectSpotify() {
  const { data: session } = useSession();
  return (
    <div className='p-6'>
      { session ? (
        <>
          <p>Connected</p>
          <button onClick={() => signOut()} className="px-4 py-2 bg-gray-800 text-white rounded">
            Sign Out
          </button>
        </>
      ) : (
        <button onClick={() => signIn('spotify')} className="px-4 py-2 bg-black text-white rounded">
          Connect Spotify
        </button>
      )}
    </div>
  )
}
