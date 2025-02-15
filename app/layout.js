import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/app/Provider'
import Recoilroot from '@/components/Recoilroot'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Envi-gram App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
     <body className={inter.className}>
      <Provider>
        <Recoilroot>
        {children}
        </Recoilroot>
      </Provider>
     </body>
    </html>
  )
}
