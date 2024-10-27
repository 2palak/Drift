import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Grid,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Start.css'; // Import the CSS file


const Start = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login'); // Redirect to the login page
    };

    const handleDetails = () => {
        navigate('/details'); // Navigate to Details.js
    };

    const handleMarketTrends = () => {
        navigate('/market'); // Navigate to Market.js
    };

    const handleUserReviews = () => {
        navigate('/customer'); // Navigate to customer.js
    };

    return (
        <Container maxWidth={false} className="start-container">
            {/* Navigation Bar */}
            <AppBar position="fixed" className="navbar"> {/* Fixed to the top */}
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" className="navbar-logo">Drift</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button color="inherit" onClick={handleDetails}>Details</Button>
                        <Button color="inherit" onClick={handleMarketTrends}>Market Trends</Button>
                        <Button color="inherit" onClick={handleUserReviews}>User Reviews</Button>
                        <Button 
                            variant="contained" 
                            className="get-started-button" 
                            onClick={handleGetStarted}
                            sx={{ ml: 2 }} // Adds left margin to separate from other buttons
                        >
                            Get Started
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content Area */}
            <Grid container spacing={2} className="main-content">
                <Grid item xs={12} md={6} className="left-side centered-text">
                    <Box className="text-box">
                        <Typography variant="h2" className="title">
                            Drift <br />
                            <strong>Precision</strong>
                        </Typography>
                        <Typography variant="body1" className="tagline" sx={{ mt: 2, fontFamily: 'Raleway, sans-serif' }}>
                        Unlock the ultimate deal, whether buying or selling. Rule the market with unbeatable confidence and expert moves. Stay ahead of the game, making every transaction iconic. Embrace the future, innovate your strategies, and watch your success soar. Your journey to market mastery starts here—make it legendary. 💥
                        </Typography>
                        <Typography variant="body1" className="tagline" sx={{ mt: 2, fontFamily: 'Raleway, sans-serif' }}>
                        In fact, make it so epic, people will ask, "How did you do that?" 😉
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} className="right-side">
                    <video 
                        controls 
                        className="video-embed"
                        width="100%"
                        height="100%"
                        autoPlay
                        muted // This allows the video to autoplay in most browsers
                    >
                        <source src={`${process.env.PUBLIC_URL}/videos/my-video.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Start;
