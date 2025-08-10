# 🎵 MoodMixtape

>**AI-powered Spotify playlist generator** that curates tracks based on your mood, then creates and embeds them directly into your Spotify account.

## Overview

MoodMixtape lets you:
1. **Log in with Spotify** using a secure OAuth flow
2. **Generate an AI-curated playlist** from your mood and genre prompts
3. **Create the playlist in your Spotify account** automatically
4. **Embed & preview the playlist** right inside the app

Build with **Next.js**, **TypeScript**, **RTK Query**, and **NextAuth** for authentication.
Spotify integration uses the **Web API** with full support for refreshing access tokens.

---

## Features
- 🔐 **Spotify OAuth Login** with automatic token refresh  
- 🎯 **AI-curated playlists** based on song list or mood  
- 📋 Playlist **create + save** directly to your Spotify account  
- 🎨 **Responsive design** with Tailwind CSS  
- ⚡ Instant **playlist embed** for quick listening  
- 🛡 Strict **type safety** 
- 🔄 Handles **token expiration** automatically

---

## 🛠 Tech Stack

**Frontend & Server**:
- [Next.js 14+ (App Router)](https://nextjs.org/)  
- [React 18](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  

**Auth**:
- [NextAuth.js](https://next-auth.js.org/) with **Spotify Provider**  

**State Management & API**:
- [Redux Toolkit](https://redux-toolkit.js.org/)  
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)  

**Integration**:
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)  

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/mood-mixtape.git
cd mood-mixtape
```

## 1. Install dependencies
yarn install

## 2. Create a Spotify App
Go to Spotify Developer Dashboard
Create a new app
Set your Redirect URI to:
```
https://127.0.0.1:3000/api/auth/callback/spotify
```
(Spotify does not allow localhost)

## 3. Environment Variables
Create .env.local in /client

```
# Spotify credentials
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# NextAuth
NEXTAUTH_SECRET=super-secret-key
NEXTAUTH_URL=http://127.0.0.1:3000
```

App will be available at: http://127.0.0.1:3000

## ⚠️ Notes

- Spotify embed playback may be restricted by browser **third-party cookie** settings.  
  - If playback doesn’t start inside the embed, try **allowing third-party cookies for `open.spotify.com`** in your browser settings.  
  - Alternatively, click “Open in Spotify” to launch the playlist in a new tab.
- Redirect URIs **must** match exactly between your `.env.local` and Spotify dashboard.
- For local development, HTTP works fine (`http://127.0.0.1:3000`) — HTTPS is only required for production.
