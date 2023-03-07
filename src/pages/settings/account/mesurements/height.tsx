import { Grid, Card, CardContent, Button, CardHeader, TextField } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../../context/auth";
import { SettingsLayout } from "../../../../layouts";

type FormData = {
  height: number;
};

const HeightPage: NextPage = () => {

  const { user, updateUserData } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onChangeHeight = async( { height }: FormData ) => {
    await updateUserData(user.email!, height, 'height');
    reset();
  };

  return (
    <SettingsLayout title={'Update Height'} pageDescription={'Page to update the height of the user.'}>
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
            <CardHeader title={'Change height'} disableTypography/>
            <CardContent>
              <form onSubmit={handleSubmit(onChangeHeight)} noValidate>
                <Grid container spacing={2} justifyContent={'center'} flexDirection={'row'}>
                  <Grid item xs={8}>
                    <TextField 
                      id="height" 
                      label="Height" 
                      variant="outlined" 
                      required
                      type={'number'}
                      fullWidth
                      { ...register('height')}
                      helperText={`Remember your height unit are ${user.metrics?.metricUnit.toUpperCase()}`}
                    />
                  </Grid>
                  <Grid item xs={4} marginTop={1}>
                    <Button type="submit" fullWidth size="large">
                      Save
                    </Button>
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

export default HeightPage;
