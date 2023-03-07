import { FC, useContext } from 'react';
import Head from 'next/head';
import { Fab } from '@mui/material';
import { CancelOutlined } from '@mui/icons-material';
import { WorkoutContext } from '../../context/workout';
import { EndWorkoutDialog } from '../components/workout';

interface Props {
  children?: any;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const WorkoutLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  const { handleFinishWorkoutDialog: handleWorkoutDialog } = useContext(WorkoutContext)
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

      <main style={{
        margin: '30px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}

        <Fab sx={{
          display: 'flex',
          position: 'fixed',
          right: '25px',
          top: "25px"
        }}
          onClick={() => handleWorkoutDialog(true) } color='error'><CancelOutlined /></Fab>
        <EndWorkoutDialog />
      </main>
    </>
  )
}
