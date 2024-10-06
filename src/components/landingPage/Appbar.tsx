
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DescriptionTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';


export default function Appbar() {
  const checkLoggedIn=()=>{
    const loggedIn=localStorage.getItem('authToken')
    if (loggedIn){
      return true
    }else{
      return false
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor:'white'}}>
        <Toolbar>
          <DescriptionTwoTone sx={{ color: 'green' }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' },color:'GrayText' }}
          >
            JotSpot
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {checkLoggedIn() ? (
            <Link to="/app">
              <Button key="Home" variant="text" sx={{ color: 'gray', borderColor: 'grey', marginRight: 2 }}>
                Home
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button key="Home" variant="text" sx={{ color: 'gray', borderColor: 'grey', marginRight: 2 }}>
                Home
              </Button>
            </Link>
          )}
              <Link to={'/login'}>
              <Button key='Login' variant='outlined' sx={{ color:'gray',marginRight:2,outlineColor:'grey', ":hover":{color:'grey'}}}>
              Login
            </Button>
            </Link>
            <Link to={'/signup'}>
            <Button key='Sign Up' variant='contained' sx={{ backgroundColor:'green',marginRight:2 }}>
            Sign Up
          </Button>
          </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
      </Box>
    </Box>
  );
}
