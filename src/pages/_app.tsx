import '~/styles/globals.css';
import type { AppProps } from 'next/app';

import { useState } from 'react';

import type { TimetableInput } from '~/types/typedef';
import { TimeTableInputContext } from '~/hooks/TimetableInputContext';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NextNProgress from 'nextjs-progressbar';
import DarkTheme from '~/components/design/DarkTheme';

// credentials
import OneTap from '~/components/OneTap';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { useUserCredentials } from '~/hooks/hooks';
import { AppStyleProvider, appTheme } from '~/styles/Style';
import { useRouter } from 'next/router';
import BgGlow from '~/components/BgGlow';

const footerPages = ['/', '/contribute', '/developer', '/freeclassrooms'];
const excludeHeadPages = ['/contribute']

export default function App({ Component, pageProps }: AppProps) {
   const [timeTableInput, setTimeTableInput] = useState<TimetableInput>({
      fall: null,
      semester: null,
      section: null
   });

   const [user, setUser] = useUserCredentials();
   const router = useRouter();
   
   return (
      <>
         <TimeTableInputContext.Provider value={{ timeTableInput, setTimeTableInput }}>
            <UserCredentialsContext.Provider value={{ user, setUser }}>
               <BgGlow />
               <NextNProgress color="var(--loader-color)" />
               <AppStyleProvider theme={appTheme}>
                  <DarkTheme />
                  <OneTap />
                  {!excludeHeadPages.includes(router.pathname) && <Header />}
                  <Component {...pageProps} />
                  {footerPages.includes(router.pathname) && <Footer fixedBottom={false} />}
                  {router.pathname.includes('/timetable/') && <Footer fixedBottom={false} />}
               </AppStyleProvider>
            </UserCredentialsContext.Provider>
         </TimeTableInputContext.Provider>
      </>
   );
}

