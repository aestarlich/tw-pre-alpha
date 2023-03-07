import { FC, useContext } from 'react';
import Head from 'next/head';
import { CustomToast, Navbar, SideMenu } from '../components/ui';
import { CustomButton } from '../components/ui';
import { Box } from '@mui/material';
import { BoltOutlined } from '@mui/icons-material';
import { EditionTrainingDialog } from '../components/exercises/EditionTrainingDialog';
import { BackToTopButton } from '../components/ui/BackToTopButton';
import { AuthContext } from '../../context/auth';
import { ContinueWorkoutDialog } from '../components/workout';

interface Props {
  children?: any;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  noWorkout?: boolean;
}

export const MainLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl, noWorkout }) => {

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />


        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {
          imageFullUrl && <meta name="og:image" content={imageFullUrl} />
        }

      </Head>

      <nav id="back-to-top-anchor">
        <Navbar />
      </nav>

      <SideMenu />

      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}
      </main>
      {
        isLoggedIn && !noWorkout
          ? <Box sx={{
            backgroundColor: { xs: 'primary', md: 'rgba(0, 0, 0, 0)' },
            position: 'fixed',
            bottom: { xs: 0, md: 30 },
            right: { xs: 0, md: 30 },
            width: { xs: '100%', md: 'fit-content' },
            padding: { xs: 2, md: 0 }
          }}>
            <CustomButton text='Its Workout Time' isNav={true} path='/routines' icon={<BoltOutlined />} />
          </Box>
          : <></>
      }


      <EditionTrainingDialog />
      <ContinueWorkoutDialog />
      <CustomToast />
      <BackToTopButton />
    </>
  );
};
