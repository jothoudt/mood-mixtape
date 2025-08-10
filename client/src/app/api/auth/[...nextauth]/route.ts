import NextAuth, { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import axios from "axios";

const TOKEN_URL = 'https://accounts.spotify.com/api/token';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
  try {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as string,
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    });

    const res = await axios.post(TOKEN_URL, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token, expires_in, refresh_token } = res.data;

    return {
      ...token,
      accessToken: access_token,
      accessTokenExpires: Date.now() + (expires_in - 60) * 1000,
      refreshToken: refresh_token ?? token.refreshToken,
    };
  } catch (e) {
    return { ...token, error: `RefreshAccessTokenError ${e}` };
  }
}

const authOptions: NextAuthOptions = {
  debug: true,
  pages: { error: '/auth/error' },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            "user-read-email",
            "user-read-private",
            "playlist-modify-public",
            "playlist-modify-private",    
          ].join(" "),
          show_dialog: true,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (Number(account.expires_in)! - 60) * 1000,
          refreshToken: account.refresh_token,
          user: token.user,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if ('accessToken' in session) {
        session.accessToken = token.accessToken;
      }
      if ('error' in session) {
        session.error = token.error;
      }
        return session;
    },
  },
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
