import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {RecoilRoot , RecoilEnv} from 'recoil'
import Appbar from 'ui/components/Appbar'
import { InitUser } from 'ui'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <RecoilRoot>
      <Appbar application='Admin'/>
      <InitUser url="http://localhost:3000/api/me"/>
      <Component {...pageProps} />
    </RecoilRoot>
    
  </>
}
