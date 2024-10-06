import { DescriptionTwoTone } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UserDetails from "../../models/userdetails";
import { useState } from "react";
import { register } from "../../api";

const defaultObj: UserDetails = {
    email: '',
    password: '',
    firstname:'',
    lastname:''
};

export default function SignUpPage(){
    const [details, setDetails] = useState<UserDetails>(defaultObj);
    const navigate= useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name,':', e.target.value);
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token: string = await register(details);
        if (token) {
            navigate('/app'); 
        }
        console.log('Submitted for registering:', details);
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex' }}>
            <Grid container sx={{ flex: 1 }}>
                <Grid item xs={12} md={6} sx={{ backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <DescriptionTwoTone sx={{ color: 'green', fontSize: 'clamp(2rem, 5vw, 4.375rem)' }} />
                    <Typography noWrap component="div" sx={{ color: 'green', fontSize: 'clamp(2rem, 5vw, 4.375rem)' }}>
                        JotSpot
                    </Typography>
                    <p style={{ fontSize: 'clamp(2rem, 5vw, 4.375rem)', fontWeight: 600 }}>
                        Sign Up to get started.
                    </p>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ width: '80%' }}>
                        <Typography component="h1" variant="h5" align="center">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        id='firstname'
                                        label="First Name"
                                        name='firstname'
                                        autoFocus
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        name="lastname"
                                        label="Last Name"
                                        id="lastname"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, backgroundColor: 'green' }}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Link to='/login'>
                                    {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
