import { FC } from 'react';
import Head from 'next/head';
import { CustomToast, Navbar, SideMenu } from '../components/ui';
import { CustomButton } from '../components/ui';
import { Box } from '@mui/material';
import { BoltOutlined } from '@mui/icons-material';
import { EditionTrainingDialog } from '../components/exercises/EditionTrainingDialog';
import { BackToTopButton } from '../components/ui/BackToTopButton';

import style from '../styles/AuthLayout.module.scss';

interface Props {
  children?: any;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const AuthLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
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

      <main className={style.main} style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}
      </main>


      <EditionTrainingDialog />
      <CustomToast />
      <BackToTopButton />
    </>
  );
};
