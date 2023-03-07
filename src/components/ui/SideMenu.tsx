import { useContext, useState } from 'react';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AccountCircleOutlined, AdminPanelSettings, AnalyticsOutlined, BoltOutlined, FitnessCenterOutlined, LoginOutlined, LogoutOutlined, SearchOutlined, SettingsOutlined, SupportOutlined } from "@mui/icons-material";

import { useRouter } from 'next/router';
import { UiContext } from '../../../context';
import { CustomButton } from '../ui';
import { RoutineContext } from '../../../context/routine';
import { AuthContext } from '../../../context/auth';


export const SideMenu = () => {

  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { handleEditionDialog } = useContext(RoutineContext);
  const { user, isLoggedIn, logout } = useContext(  AuthContext );

  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/exercises/search/${searchTerm}`);
  };


  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };


  return (
    <Drawer
      open={isMenuOpen}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ padding: 2 }}>
        {/* <Logo /> */}
      </Box>

      {
        isLoggedIn
          ?
          <ListItem sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
              type='text'
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onSearchTerm}
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          :
          <></>
      }

      {
        isLoggedIn
          ?
          <Box sx={{ padding: 2 }}>
            <CustomButton text='Create Routine' handleClick={() => { handleEditionDialog(true); toggleSideMenu() }} path='/' icon={<FitnessCenterOutlined />} />
          </Box>
          :
          <></>
      }

      {
        isLoggedIn
          ?
          <Box sx={{ minWidth: 300 }}>
            <List>
              <ListItem button onClick={() => navigateTo('/exercises')} >
                <ListItemIcon>
                  <SupportOutlined />
                </ListItemIcon>
                <ListItemText primary={'All Exercises'} />
              </ListItem>

              <Divider sx={{ m: 2 }} />

              <ListItem 
                button
                onClick={() => navigateTo('/routines')}>
                <ListItemIcon>
                  <BoltOutlined />
                </ListItemIcon>
                <ListItemText primary={'My Trainings'} />
              </ListItem>

              <ListItem
                button
                onClick={() => navigateTo('/')}
              >
                <ListItemIcon>
                  <AnalyticsOutlined />
                </ListItemIcon>
                <ListItemText primary={'My Progress'} />
              </ListItem>

              <Divider sx={{ m: 2 }} />

              {/* Auth items here */}

              <ListItem 
                button
                onClick={() => navigateTo('/profile')}
              >
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItem>

              <ListItem
                button
                onClick={() => navigateTo('/settings')}
              >
                <ListItemIcon>
                  <SettingsOutlined />
                </ListItemIcon>
                <ListItemText primary={'Settings'} />
              </ListItem>

          <ListItem 
            button
            onClick={() => navigateTo('/routines')}>
            <ListItemIcon>
              <BoltOutlined />
            </ListItemIcon>
            <ListItemText primary={'My Routines'} />
          </ListItem>
              <ListItem
                button
                onClick={logout}
              >
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary={'LogOut'} />
              </ListItem>
            </List>
          </Box>
          :
          <Box sx={{ minWidth: 300 }}>
            <List>
              <ListItem 
                button
                onClick={() => navigateTo('/profile')}
              >
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItem>

              <ListItem
                button
                onClick={() => navigateTo('/settings')}
              >
                <ListItemIcon>
                  <SettingsOutlined />
                </ListItemIcon>
                <ListItemText primary={'Settings'} />
              </ListItem>
              <ListItem
                button
                onClick={() => navigateTo(`/auth/login?p=${ router.asPath }`)}
              >
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>
                <ListItemText primary={'LogIn'} />
              </ListItem>
            </List>
          </Box>
      }
    </Drawer>
  );
};