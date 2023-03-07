import { Card, CardHeader, CardContent, Grid, Button } from "@mui/material";
import { useContext } from "react";
import { UiContext, AuthContext } from "../../../../context";

export const MesureUnitCard = () => {

  let { updateUserData, user } = useContext(AuthContext);
  const { handleAlertMessage } = useContext(UiContext);

  const onUpdateUnits = async(email: string, mesureWeight: string) => {
    const resp = await updateUserData(email, mesureWeight, 'mesure');
    if(resp.status !== 200){
      handleAlertMessage({alertMessage: resp.message, displayAlert: true, severity: 'error'});
    }else{
      handleAlertMessage({alertMessage: resp.message, displayAlert: true, severity: 'success'});
    }
  };

  return (
    <Card>
      <CardHeader title={'Body Measurements'} disableTypography />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {
              user.metrics?.metricUnit === 'cm'
                ? <Button fullWidth>cm</Button>
                : 
                <Button 
                  fullWidth 
                  variant='outlined'
                  onClick={() => onUpdateUnits(user.email ? user.email : '', 'cm')}
                >
                  cm
                </Button>
            }
          </Grid>
          
          <Grid item xs={6}>
            {
              user.metrics?.metricUnit === 'in'
                ? <Button fullWidth>in</Button>
                : 
                <Button 
                  fullWidth 
                  variant='outlined'
                  onClick={() => onUpdateUnits(user.email ? user.email : '', 'in')}
                >
                  in
                </Button>
            }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
