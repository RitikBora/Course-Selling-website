import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {RecoilRoot} from 'recoil'
import Appbar from 'ui/components/Appbar'
import { InitUser } from 'ui'
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <RecoilRoot>
      <Appbar application='user'/>
      <InitUser url="http://localhost:3000/api/me"/>
      <Component {...pageProps} />
    </RecoilRoot>
    
  </>
}
