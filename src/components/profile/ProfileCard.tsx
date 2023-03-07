import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { WorkspacePremiumOutlined } from '@mui/icons-material';
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";

export const ProfileCard = () => {

  let { user } = useContext(AuthContext);
  
  return (
    <Grid
      item
      xs={12}
    >
      <Card className='fadeIn'>

        <CardContent>
          <Grid 
            container 
            spacing={2} 
            sx={{
              display: 'flex', 
              flexDirection: 'row', 
              alignContent: 'space-between', 
              alignItems: 'center'
            }}
          >

            <Grid item xs={2}>
              {
                user.image
                  ? <Avatar sx={{ width: 56, height: 56 }} src={`${user.image}`} />
                  : <Avatar sx={{ width: 56, height: 56 }}>{user.name.split('')[0]}</Avatar>
              }
            </Grid>

            <Grid item>
              <Typography
                color="#FFF"
                variant={'h1'}
                sx={{
                  marginLeft: 3
                }}
              >
                {user.name}
                <span style={{ marginLeft: 5, color: 'orange'}}>
                  {
                    user.isPro
                      ? <WorkspacePremiumOutlined/>
                      : <></>
                  }
                </span>
              </Typography>
            </Grid>

          </Grid>
        </CardContent>

        <CardContent>
          <Grid 
            container 
            spacing={2} 
            sx={{
              display: 'flex', 
              flexDirection: 'row', 
              alignContent: 'space-between', 
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Grid 
              item
              xs={5}
            >
              Height: {`${user.metrics.height.toFixed(2)} ${user.metrics.metricUnit}`}
            </Grid>
            <Grid 
              item
              xs={5}
            >
              Weight: {`${user.metrics.weight.toFixed(2)} ${user.metrics.massUnit}`}
            </Grid>

          </Grid>
        </CardContent>

      </Card>
    </Grid>
  );
};
