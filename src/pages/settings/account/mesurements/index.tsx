import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../../../../context/auth";
import { SettingsLayout } from "../../../../layouts";

const UpdateMesurementsPage: NextPage = () => {

  const { user } = useContext(  AuthContext );
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };
  
  return (
    <SettingsLayout title={'Edit profile info'} pageDescription={'Edit the information of your profile'}>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <Card>
            <CardHeader title={'Mesurements Information'} disableTypography />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Button 
                    variant={'contained'} 
                    size={'large'} 
                    fullWidth
                    onClick={() => navigateTo('/settings/account/mesurements/height')}
                  >
                    Height
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant={'contained'} 
                    size={'large'} 
                    fullWidth
                    onClick={() => navigateTo('/settings/account/mesurements/weight')}
                  >
                    Weight
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </SettingsLayout>
  );
};

export default UpdateMesurementsPage;
