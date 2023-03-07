import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { AppBar, Box, Button, IconButton, Input, InputAdornment, Toolbar } from '@mui/material';
import { AuthContext, UiContext } from '../../../context';
import { ClearOutlined, FitnessCenterOutlined, MenuOutlined, SearchOutlined } from '@mui/icons-material';
import { Logo } from './';
import { RoutineContext } from '../../../context/routine';


export const Navbar = () => {

  const { push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const { handleEditionDialog } = useContext(RoutineContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/exercises/search/${searchTerm}`);
    setSearchTerm('');
    setIsSearchVisible(false);
  };

  return (
    <AppBar>
      <Toolbar>
        <Box width={200}>
          <Logo />
        </Box>

        <Box flex={1} />

        <Box sx={{ display: { xs: 'none', md: 'block' } }}
          className="fadeIn">
          {/* <CustomButton text='Create Training' handleClick={() => handleEditionDialog(true)} icon={<FitnessCenterOutlined />} /> */}
          { isLoggedIn && <Button onClick={() => handleEditionDialog(true)} startIcon={<FitnessCenterOutlined />}>Create Routine</Button> }
        </Box>


        <Box flex={1} />

        {/* Pantallas pantallas grandes */}
        <Box
          width={200}
          display="flex"
          justifyContent="flex-end">

          {
            isSearchVisible
              ? (
                <Input
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                  className='fadeIn'
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                  type='text'
                  placeholder="Search..."
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setIsSearchVisible(false)}
                      >
                        <ClearOutlined />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )
              :
              (
                <IconButton
                  onClick={() => setIsSearchVisible(true)}
                  className="fadeIn"
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                  <SearchOutlined />
                </IconButton>
              )
          }
        </Box>

        <IconButton onClick={toggleSideMenu}>
          <MenuOutlined />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};
