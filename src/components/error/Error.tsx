import { Box, Button, Grid } from "@mui/material";
import {useNavigate} from "react-router-dom";
import error from './error.png'

export default function ErrorPage() {
    const navigate = useNavigate()
    const handleBack=()=>{
        navigate(-1)
    }
    return (
<Box sx={{ margin: { xs: 2, md: 10 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box >
                    <p style={{ fontSize: 'clamp(2rem, 5vw, 4.375rem)', fontWeight: 600,color:'green' }}>
                            JotSpot
                        </p>
                        <p style={{ fontSize: 'clamp(2rem, 5vw, 4.375rem)', fontWeight: 600 }}>
                            Oopsie Doopsie
                        </p>
                        <p style={{ fontSize: 'clamp(2rem, 5vw, 4.375rem)', fontWeight: 600 }}>
                            You shouldn't be here
                        </p>
                            <Button variant="contained" sx={{width:'70%',height:80,backgroundColor:'Black',color:'white',fontSize:30,fontWeight:500}} onClick={handleBack}>GO BACK!</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={error} alt="Illustration" style={{ width: '100%', maxWidth: 800 }} />
                    </Box>
                </Grid>
                </Grid>
                
</Box>
    )}