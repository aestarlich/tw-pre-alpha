import { WarningOutlined } from "@mui/icons-material";
import { Grid, Card, CardContent, Typography, CardHeader, TextField, Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UiContext } from "../../../../context";
import { AuthContext } from "../../../../context/auth";
import { SettingsLayout } from "../../../layouts";

type FormData = {
  newName: string
};

const ChangeNamePage: NextPage = () => {
  
  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { user, updateUserData } = useContext(AuthContext);
  const { handleAlertMessage } = useContext(UiContext);
  const router = useRouter();

  const onChangeName = async( { newName }: FormData ) => {
    if(newName.length < 2) {
      handleAlertMessage({ alertMessage: 'Min length of 2 characters.', displayAlert: true, severity: "warning" });
      return;
    }
    const resp = await updateUserData(user!.email, newName, 'name');
    if(resp.status !== 200){
      handleAlertMessage({alertMessage: resp.message, displayAlert: true, severity: 'error'});
    }else{
      handleAlertMessage({alertMessage: resp.message, displayAlert: true, severity: 'success'});
      await setTimeout(() => reset(), 5000);
    }
  };

  return (
    <SettingsLayout title={'Change name'} pageDescription={'Change name of user'}>
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
            <CardHeader title={'Change name'} disableTypography/>
            <CardContent>
              <form onSubmit={handleSubmit(onChangeName)} noValidate>
                <Grid container spacing={2}>
                  <Grid item container spacing={2}>
                    <Grid item xs={12}>
                      <TextField 
                        id="newName" 
                        label="Name" 
                        variant="outlined" 
                        type={'text'} 
                        fullWidth
                        { ...register('newName')}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item xs={12}>
                      <Button type="submit" sx={{float: 'right'}}>
                        Save Name
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

export default ChangeNamePage;