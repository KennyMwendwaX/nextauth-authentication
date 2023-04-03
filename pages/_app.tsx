import "@/styles/global.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Component {...pageProps} />
    </div>
  )
}
