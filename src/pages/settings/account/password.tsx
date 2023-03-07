import { WarningOutlined } from "@mui/icons-material";
import { Grid, Card, CardContent, Typography, CardHeader, TextField, Button, Alert, AlertTitle } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../context/auth";
import { SettingsLayout } from "../../../layouts";
import bcrypt from 'bcryptjs';
import { UiContext } from "../../../../context";
import { useSession } from "next-auth/react";

type FormData = {
  newPassword: string,
  newPasswordC: string,
};

const ChangePasswordPage: NextPage = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { user, updateUserData, logout } = useContext(AuthContext);
  const { handleAlertMessage } = useContext(UiContext);
  const router = useRouter();

  const onChangePassword = async( { newPassword, newPasswordC }: FormData ) => {

    if(newPassword.length < 6) {
      handleAlertMessage({ alertMessage: 'Min length of 6 characters.', displayAlert: true, severity: "warning" });
      return;
    }

    if( newPasswordC !== newPassword ) {
      handleAlertMessage({ alertMessage: 'Passwords are different.', displayAlert: true, severity: "warning" });
      return;
    }

    await updateUserData(user!.email, newPassword, 'password');
    logout();
  };

  return (
    <SettingsLayout title={'Change password'} pageDescription={'Change password of user'}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button onClick={() => router.back()}>
                    Back
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            <CardHeader title={'Change password'} disableTypography/>
            <CardContent>
              <form onSubmit={handleSubmit(onChangePassword)} noValidate>
                <Grid container spacing={2}>
                  <Grid item container spacing={2}>
                    <Grid item xs={6}>
                      <TextField 
                        id="newPassword" 
                        label="Password" 
                        variant="outlined" 
                        required
                        type={'password'} 
                        fullWidth
                        { ...register('newPassword')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        id="newPasswordC"
                        label="Confirm Password" 
                        variant="outlined"
                        required
                        type={'password'} 
                        fullWidth
                        { ...register('newPasswordC')}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item xs={12}>
                      <Button type="submit" sx={{float: 'right'}}>
                        Save Password
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </SettingsLayout>
  );
};

export default ChangePasswordPage;