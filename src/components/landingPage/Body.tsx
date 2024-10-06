import { Box, Button, Grid } from "@mui/material";
import ss from './ss.png';
import { Link } from "react-router-dom";

export default function Body() {
    return (
        <Box sx={{ margin: { xs: 2, md: 10 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box>
                    <p style={{ fontSize: 'clamp(2rem, 5vw, 4.375rem)', fontWeight: 600,color:'green' }}>
                            JotSpot
                        </p>
                        <p style={{ fontSize: 'clamp(2rem, 5vw, 4.375rem)', fontWeight: 600 }}>
                            A new way to jot your thoughts down
                        </p>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <Link to={'/login'}>
                            <Button variant="contained" sx={{height:40, width:100,backgroundColor:'green',color:'white'}}>Log In</Button>
                        </Link>
                        <Link to={'/signup'}>
                            <Button variant="contained" sx={{height:40, width:150,backgroundColor:'black',color:'white'}}>Sign Up</Button>
                        </Link>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={ss} alt="Illustration" style={{ width: '100%', maxWidth: 800 }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
