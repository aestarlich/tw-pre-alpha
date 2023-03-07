import { FC, useContext } from 'react';
import Head from 'next/head';
import { CustomButton, CustomToast, Navbar, SideMenu } from '../components/ui';
import { Box } from '@mui/material';
import { CloseOutlined, InputOutlined, SaveOutlined } from '@mui/icons-material';
import { RoutineContext } from '../../context/routine';
import { useRouter } from 'next/router';
import { UiContext } from '../../context';

interface Props {
  children?: any;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const EditionLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  const { finishRoutineEdition } = useContext(RoutineContext);
  const { handleAlertMessage } = useContext(UiContext)
  const { push, query } = useRouter();

  const handleEditionMode = async(isSaving: boolean) => {
    const { id } = query;
    const { data, status } = await finishRoutineEdition(isSaving, id) || '';
    if(status !== 200) {
      handleAlertMessage({ alertMessage: data, displayAlert: true, severity: "error" });
      return;
    }
    isSaving ? push('/routines') : push('/');
    handleAlertMessage({ alertMessage: data, displayAlert: true, severity: "success" });
  }

  const handleSaveAndContinue = async(isSaving: boolean) => {
    const { id } = query;
    const { data, status } = await finishRoutineEdition(isSaving, id) || '';
    if(status !== 200) {
      handleAlertMessage({ alertMessage: data, displayAlert: true, severity: "error" });
      return;
    } else {
      isSaving ? push(`/routines/${id}`) : push('/');
      handleAlertMessage({ alertMessage: data, displayAlert: true, severity: "success" });

    }
  }

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
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}
      </main>

      <Box sx={{
        backgroundColor: { xs: 'primary', md: 'rgba(0, 0, 0, 0)' },
        position: 'fixed',
        top: { xs: 10, md: 30 },
        right: { xs: 20, md: 30 },
        width: { xs: '100%', md: 'fit-content' },
        padding: { xs: 2, md: 0 },
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1
      }}>
        <CustomButton handleClick={() => handleEditionMode(false)} icon={<CloseOutlined />} variant='outlined' color='error' />
      </Box>

      <Box sx={{
        position: 'fixed',
        bottom: { xs: 0, md: 30 },
        right: { xs: 20, md: 30 },
        width: { xs: '100%', md: 'fit-content' },
        padding: { xs: 2, md: 0 },
        display: 'flex',
        justifyContent: { xs: 'flex-end', md: 'space-between' },
        gap: 1
      }}>
        <CustomButton handleClick={() => handleEditionMode(true)} icon={<SaveOutlined />} variant='outlined' />
        <CustomButton text='Save and continue' handleClick={() => handleSaveAndContinue(true)} icon={<InputOutlined />} />
      </Box>
      <CustomToast />
    </>
  )
}
