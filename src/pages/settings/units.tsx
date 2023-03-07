import { NextPage } from "next";
import { SettingsLayout } from "../../layouts";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { MassUnitCard, MesureUnitCard } from "../../components/settings";

const UnitsPage: NextPage = () => {

  return (
    <SettingsLayout title={'Units'} pageDescription={'Units page for TheWorkout'}>

      <Grid container spacing={4}>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{display: "flex", flexDirection: 'row', justifyContent: 'center', padding: 3}}>
              <InfoIcon color="info" />
              <Typography sx={{marginLeft: 2}}>
                Actually only work with this two unit mesures.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <MassUnitCard />
        </Grid>

        <Grid item xs={12}>
          <MesureUnitCard />
        </Grid>

      </Grid>

    </SettingsLayout>
  );
};

export default UnitsPage;
function setShowError(arg0: boolean) {
  throw new Error("Function not implemented.");
}

