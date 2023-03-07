import { ArrowForwardIosOutlined, CreditCardOutlined, InfoOutlined, LightbulbOutlined, LockOutlined, PersonOutline, QuestionMarkOutlined, StraightenOutlined } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { SettingsLayout } from "../../layouts";


const SettingsPage: NextPage = () => {

  const { user, isLoggedIn } = useContext(  AuthContext );
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <SettingsLayout title={'Settings'} pageDescription={'Settings page of TheWorkout'}>
      
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <Card>
            <CardHeader title={'Account'} disableTypography />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {
                    isLoggedIn
                      ? 
                      <Button startIcon={<LockOutlined />} variant={'contained'} size={'large'}  fullWidth onClick={() => navigateTo('/settings/account')}>
                        Account
                      </Button>
                      : <Button startIcon={<LockOutlined />} variant={'contained'} size={'large'}  fullWidth disabled>Account</Button>
                  }
                </Grid>
                <Grid item xs={12}>
                  {
                    isLoggedIn
                      ? <Button startIcon={<CreditCardOutlined />} variant={'contained'} size={'large'}  fullWidth>Suscription</Button>
                      : <Button startIcon={<CreditCardOutlined />} variant={'contained'} size={'large'}  fullWidth disabled>Suscription</Button>
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title={'Preference'} disableTypography />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {
                    isLoggedIn
                      ? 
                      <Button startIcon={<StraightenOutlined />} variant={'contained'} size={'large'}  fullWidth onClick={() => {navigateTo('/settings/units')}}>
                        Units
                      </Button>
                      :
                      <Button startIcon={<StraightenOutlined />} variant={'contained'} size={'large'}  fullWidth onClick={() => {navigateTo('/settings/units')}} disabled>
                        Units
                      </Button>
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title={'Help'} disableTypography />
            <CardContent>
              <Grid container spacing={3}>

                <Grid item xs={12}>
                  <Button
                    startIcon={<QuestionMarkOutlined />}
                    variant={'contained'}
                    size={'large'} 
                    fullWidth
                  >
                    Frequently Asked Questions
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    startIcon={<LightbulbOutlined />}
                    variant={'contained'}
                    size={'large'} 
                    fullWidth
                  >
                    Feature Request
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    startIcon={<InfoOutlined />}
                    variant={'contained'}
                    size={'large'} 
                    fullWidth
                  >
                    About
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

export default SettingsPage;
