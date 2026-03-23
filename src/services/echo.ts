import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: typeof Pusher
  }
}

window.Pusher = Pusher

let echoInstance: Echo<'pusher'> | null = null

export function getEcho(): Echo<'pusher'> {
  if (echoInstance) return echoInstance

  const token = localStorage.getItem('customer_token')

  echoInstance = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_REVERB_APP_KEY as string,
    wsHost: import.meta.env.VITE_REVERB_HOST as string || '127.0.0.1',
    wsPort: Number(import.meta.env.VITE_REVERB_PORT) || 8080,
    wssPort: Number(import.meta.env.VITE_REVERB_PORT) || 8080,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME as string) === 'https',
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    // Auth goes through BFF — BFF validates JWT, maps UUID → ifds_id, proxies to Reverb
    authEndpoint: `${import.meta.env.VITE_API_URL || '/api'}/v1/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        Accept: 'application/json',
      },
    },
  })

  return echoInstance
}

/** Update the Authorization header when the token changes (e.g. after login). */
export function refreshEchoAuth(token: string): void {
  if (echoInstance) {
    // @ts-ignore — access internal connector options
    echoInstance.connector.pusher.config.auth.headers.Authorization = `Bearer ${token}`
  }
}

export function disconnectEcho(): void {
  if (echoInstance) {
    echoInstance.disconnect()
    echoInstance = null
  }
}
