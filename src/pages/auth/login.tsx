import { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../layouts";
import { Box, Button, Chip, Divider, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorOutline } from "@mui/icons-material";
import { validations } from "../../../utils";
import { UiContext } from "../../../context";

type FormData = {
  email: string,
  password: string,
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const { handleAlertMessage } = useContext(UiContext);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const login = await signIn('credentials', { email, password, redirect: false });
    if (login?.error) {
      handleAlertMessage({ alertMessage: `${login?.error}`, displayAlert: true, severity: 'error' });
    } else {
      const endpoint = router.query.p || '';
      window.location.replace(`${window.location.origin}${endpoint}`);
    }
  };

  return (
    <AuthLayout title={'Login user'} pageDescription={'Login page for TheWorkout'}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box>
          <Grid
            container
            direction={'column'}
            alignContent={'center'}
            justifyContent={'center'}
            spacing={3}
          >

            <Grid item xs={12}>
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h1">
                Log in to TheWorkout App
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                type={'email'}
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type={'password'}
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
              >
                Log in
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end'>
              <Link
                href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                passHref
              >
                Create account
              </Link>
            </Grid>

            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
              <Divider sx={{ width: '100%', mb: 2 }} />
              {
                Object.values(providers).map((provider: any) => {

                  if (provider.id === 'credentials') return (<div key="credentials"></div>);

                  return (
                    <Button
                      key={provider.id}
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ mb: 1 }}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  );

                })
              }
            </Grid>

          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
