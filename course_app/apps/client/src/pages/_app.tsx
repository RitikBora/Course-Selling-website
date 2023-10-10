import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {RecoilRoot} from 'recoil'
import Appbar from 'ui/components/Appbar'
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <RecoilRoot>
      <Appbar/>
      <Component {...pageProps} />
    </RecoilRoot>
    
  </>
}
