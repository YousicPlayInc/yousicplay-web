"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ConnectedAccountsProps {
  authProvider: string;
  spotifyConnected: boolean;
}

interface ServiceConfig {
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  comingSoon: boolean;
  description: string;
  connectUrl?: string;
  disconnectUrl?: string;
}

export default function ConnectedAccounts({
  authProvider,
  spotifyConnected,
}: ConnectedAccountsProps) {
  const router = useRouter();
  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  async function handleDisconnect(serviceName: string, disconnectUrl: string) {
    setDisconnecting(serviceName);
    try {
      const res = await fetch(disconnectUrl, { method: "POST" });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error(`Failed to disconnect ${serviceName}:`, err);
    } finally {
      setDisconnecting(null);
    }
  }

  const services: ServiceConfig[] = [
    {
      name: "Google",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      ),
      connected: authProvider === "google",
      comingSoon: false,
      description: "Sign in with Google",
    },
    {
      name: "Spotify",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
      connected: spotifyConnected,
      comingSoon: false,
      description: "Get personalized course recommendations based on your music taste",
      connectUrl: "/api/spotify/connect",
      disconnectUrl: "/api/spotify/disconnect",
    },
    {
      name: "Apple Music",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#FA243C">
          <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0019.7.175a10.58 10.58 0 00-1.564-.126C17.59.014 17.036 0 15.364 0H8.64C6.964 0 6.41.014 5.864.049a10.58 10.58 0 00-1.564.126A5.022 5.022 0 002.427.891C1.31 1.624.564 2.624.247 3.934A9.23 9.23 0 00.007 6.124C-.028 6.67-.014 7.225 0 7.779v8.443c-.014.553-.028 1.108.007 1.655a9.23 9.23 0 00.24 2.19c.317 1.31 1.062 2.31 2.18 3.043a5.022 5.022 0 001.873.716c.52.086 1.042.126 1.564.126.546.035 1.1.049 2.772.049h6.724c1.676 0 2.23-.014 2.772-.049a10.58 10.58 0 001.564-.126 5.022 5.022 0 001.873-.716c1.118-.733 1.863-1.733 2.18-3.043a9.23 9.23 0 00.24-2.19c.035-.547.021-1.102.007-1.655V7.779c.014-.554.028-1.109-.007-1.655zm-6.675 4.327L12.744 17.3c-.065.089-.153.153-.256.186a.406.406 0 01-.295-.01.406.406 0 01-.21-.186.413.413 0 01-.056-.286V7.81l-2.16.574a.42.42 0 01-.26-.017.39.39 0 01-.194-.15.411.411 0 01-.075-.247V6.17a.413.413 0 01.084-.25.4.4 0 01.22-.144l5.33-1.42c.08-.02.163-.024.244-.01a.4.4 0 01.225.116.416.416 0 01.122.297v5.692z" />
        </svg>
      ),
      connected: false,
      comingSoon: true,
      description: "Discover courses that match the music you love",
    },
  ];

  return (
    <div className="space-y-3">
      {services.map((service) => (
        <div
          key={service.name}
          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
              {service.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{service.name}</p>
              <p className="text-xs text-white/40">{service.description}</p>
            </div>
          </div>

          {service.connected ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-lime/10 px-3 py-1 text-xs font-medium text-lime">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Connected
              </span>
              {service.disconnectUrl && (
                <button
                  onClick={() =>
                    handleDisconnect(service.name, service.disconnectUrl!)
                  }
                  disabled={disconnecting === service.name}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40 transition-colors hover:border-red-500/30 hover:text-red-400 disabled:opacity-50"
                >
                  {disconnecting === service.name
                    ? "Disconnecting..."
                    : "Disconnect"}
                </button>
              )}
            </div>
          ) : service.comingSoon ? (
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/30">
              Coming Soon
            </span>
          ) : (
            <a
              href={service.connectUrl}
              className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/5"
            >
              Connect
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
