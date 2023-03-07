import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { signIn, getSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../context/auth';
import { AuthLayout } from '../../layouts';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { encode, validations } from '../../../utils';
import { UiContext } from '../../../context';



type FormData = {
    name    : string;
    email   : string;
    password: string;
    filePath: any;
    username: string;
};


const RegisterPage: NextPage = () => {

  const router = useRouter();
  const { registerUser } = useContext( AuthContext );
  const { handleAlertMessage } = useContext(UiContext);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ showError, setShowError ] = useState(false);

  const onRegisterForm = async( {  name, email, password, username, filePath }: FormData ) => {
    let image: any = '';
    if(filePath.length > 0){
      image = await encode.toBase64(filePath[0]);
    }
  
    setShowError(false);
    const resp = await registerUser(username, image, name, email, password);
    if(resp.status !== 200){
      handleAlertMessage({alertMessage: resp.message, displayAlert: true, severity: 'error'});
    }else{
      handleAlertMessage({alertMessage: resp.message, displayAlert: true, severity: 'success'});
      await setTimeout(() => {signIn('credentials',{ email, password }).then(() => {return router.back()});}, 5000);
    }


  };

  return (
    
    <AuthLayout title={'Login user'} pageDescription={'Login page for TheWorkout'}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box>
          <Grid
            container
            direction={'column'}
            alignContent={'center'}
            justifyContent={'center'}
            spacing={3}
          >
            
            <Grid item xs={12}>
              <Typography variant="h1">
                Create account on TheWorkout App
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center'
            }}>
              <TextField 
                id="User Profile Photo"
                variant="outlined"
                type={'file'}
                fullWidth
                { ...register('filePath')}
                error={ !!errors.name }
                helperText={ errors.name?.message }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                id="username" 
                label="Username" 
                variant="outlined" 
                type={'text'}
                fullWidth
                { ...register('username')}
                error={ !!errors.name }
                helperText={ errors.name?.message }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                id="name" 
                label="Full Name" 
                variant="outlined" 
                type={'text'}
                fullWidth
                { ...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                error={ !!errors.name }
                helperText={ errors.name?.message }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                id="email" 
                label="Email" 
                variant="outlined" 
                type={'email'} 
                fullWidth
                { ...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                })}
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                id="password" 
                label="Password" 
                variant="outlined" 
                type={'password'} 
                fullWidth
                { ...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                size="large"
              >
                Create account
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end'>
              <Link href={ router.query.p ? `/auth/login?p=${ router.query.p }`: '/auth/login' } 
                passHref>
                  You have already account?
              </Link>
            </Grid>

          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;