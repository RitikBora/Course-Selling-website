import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {RecoilRoot , RecoilEnv} from 'recoil'
import Appbar from 'ui/components/Appbar'
import { InitUser } from 'ui'
import { BASE_URL } from '../../config'

const initUrl = `${BASE_URL}/api/me`;

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <RecoilRoot>
      <Appbar application='Admin'/>
      <InitUser url={initUrl}/>
      <Component {...pageProps} />
    </RecoilRoot>
    
  </>
}
