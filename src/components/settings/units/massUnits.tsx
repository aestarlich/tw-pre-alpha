import { Card, CardHeader, CardContent, Grid, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { UiContext, AuthContext } from "../../../../context";

export const MassUnitCard = () => {
  
  let { updateUserData, user } = useContext(AuthContext);
  const { handleAlertMessage } = useContext(UiContext);

  const onUpdateUnits = async(email: string, massWeight: string) => {
    const resp = await updateUserData(email, massWeight, 'mass');
    if(resp.status !== 200){
      handleAlertMessage({alertMessage: resp.message, displayAlert: true, severity: 'error'});
    }else{
      handleAlertMessage({alertMessage: resp.message, displayAlert: true, severity: 'success'});
    }
  };

  return (
    <Card>
      <CardHeader title={'Weight'} disableTypography />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {
              user.metrics?.massUnit === 'kg'
                ? <Button fullWidth>kg</Button>
                : 
                <Button 
                  onClick={
                    () => {
                      onUpdateUnits(user.email ? user.email : '', 'kg');
                    }
                  } 
                  fullWidth 
                  variant='outlined'
                >
                  kg
                </Button>
            }
          </Grid>             
          <Grid item xs={6}>
            {
              user.metrics?.massUnit === 'lbs'
                ? <Button fullWidth>lbs</Button>
                : 
                <Button 
                  onClick={
                    () => {
                      onUpdateUnits(user.email ? user.email : '', 'lbs');
                    }
                  } 
                  fullWidth 
                  variant='outlined'
                >
                lbs
                </Button>
            }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
