import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onOpenNewVideo: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenNewVideo }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#040C2A'}}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: 30 }}>
            AluraFlix
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" onClick={onOpenNewVideo}>
            Nuevo Video
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
