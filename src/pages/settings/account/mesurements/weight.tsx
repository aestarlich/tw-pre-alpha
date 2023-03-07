import { Grid, Card, CardContent, Button, CardHeader, TextField } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../../context/auth";
import { SettingsLayout } from "../../../../layouts";

type FormData = {
  weight: number;
};

const WeightPage: NextPage = () => {

  const { user, updateUserData } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  
  const onChangeWeight = async( { weight }: FormData ) => {
    await updateUserData(user.email!, weight, 'weight');
    reset();
  };

  return (
    <SettingsLayout title={'Update Weight'} pageDescription={'Page to update the weight of the user.'}>
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
            <CardHeader title={'Change weight'} disableTypography/>
            <CardContent>
              <form onSubmit={handleSubmit(onChangeWeight)} noValidate>
                <Grid container spacing={2} justifyContent={'center'} flexDirection={'row'}>
                  <Grid item xs={8}>
                    <TextField 
                      id="weight" 
                      label="Weight" 
                      variant="outlined" 
                      required
                      type={'number'}
                      fullWidth
                      { ...register('weight')}
                      helperText={`Remember your weight unit are ${user.metrics?.massUnit.toUpperCase()}`}
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

export default WeightPage;
