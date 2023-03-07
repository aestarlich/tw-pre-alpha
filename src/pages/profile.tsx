import { Grid } from "@mui/material";
import { NextPage } from "next";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ProfileCard, ProfileCardSkeleton, ProfileMenu, ProfileStatsPreview, ProfileStatsPreviewSkeleton, ProfileMenuSkeleton } from "../components/profile";
import { MainLayout } from "../layouts";

const ProfilePage: NextPage = () => {

  const { user, isLoggedIn } = useContext(  AuthContext );

  return (
    <MainLayout title={ user ? `${user.name} Profile` : `Profile Page` } pageDescription={'Profile page of user'} noWorkout>
      <Grid
        container
        spacing={2}
      >
        {
          isLoggedIn
            ? 
            <>
              <ProfileCard></ProfileCard>
              <ProfileStatsPreview></ProfileStatsPreview>
              <ProfileMenu></ProfileMenu>
            </>
            : 
            <>
              <ProfileCardSkeleton></ProfileCardSkeleton>
              <ProfileStatsPreviewSkeleton></ProfileStatsPreviewSkeleton>
              <ProfileMenuSkeleton></ProfileMenuSkeleton>
            </>
        }
      </Grid>
    </MainLayout>
  );
};

export default ProfilePage;
