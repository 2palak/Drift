import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Button, Container, TextField, Paper,
    Grid, IconButton, Menu, MenuItem, Box, ToggleButtonGroup, ToggleButton,
    CircularProgress
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Feedback.css'; // Your CSS file

export default function Feedback() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('🙋');
    const [feedback, setFeedback] = useState('');
    const [reaction, setReaction] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for feedback submission
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('userName');
        if (loggedInUser) {
            setUserName(loggedInUser);
        }
    }, []);

    // Handle Menu clicks
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (option) => {
        setAnchorEl(null);
        if (option === 'logout') {
            localStorage.removeItem('userName');
            navigate('/');
        } else if (option === 'feedback') {
            navigate('/feedback');
        }
    };

    // Handle feedback submission
    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
    
        if (!name.trim() && !feedback.trim() && !reaction) {
            alert('Please provide at least one field (name, feedback, or reaction).');
            return;
        }
    
        try {
            setLoading(true);
    
            const data = {
                userName: name.trim() || "",   // Adjusted to match backend schema
                feedback: feedback.trim() || null,
                reaction: reaction || null
            };
    
            const response = await axios.post('http://localhost:5000/api/feedback', data);
            console.log("Response from backend: ", response.data);
    
            setSubmitted(true);
            setName('');
            setFeedback('');
            setReaction(null);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    const handleReactionChange = (event, newReaction) => {
        if (newReaction !== null) {
            setReaction(newReaction);
        }
    };

    // New handlers for navigation
    const handleMarketTrends = () => {
        navigate('/market'); // Navigating to Market.js
    };

    const handleDetails = () => {
        navigate('/details'); // Navigating to Details.js
    };

    const handleReviews = () => {
        navigate('/reviews'); // Navigating to Details.js
    };


    return (
        <>
            {/* Navigation Bar */}
            <AppBar position="static" className="navbar">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" className="navbar-logo" component={Link} to="/home">Drift</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button color="inherit" onClick={handleDetails}>Details</Button> {/* Navigate to Details.js */}
                        <Button color="inherit" onClick={handleMarketTrends}>Market Trends</Button> {/* Navigate to Market.js */}
                        <Button color="inherit" onClick={handleReviews}>User Reviews</Button>
                        <Typography variant="subtitle1" sx={{ mx: 2 }}>
                            Hello, {userName}
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleMenuClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            
                            <MenuItem onClick={() => handleMenuClose('feedback')}>
                                Give Feedback
                            </MenuItem>
                            <MenuItem onClick={() => handleMenuClose('logout')}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Feedback Form */}
            <Container maxWidth="sm" className="feedback-container">
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '70vh' }}>
                    <Grid item xs={12}>
                        <Paper elevation={6} className="feedback-paper">
                            <Typography variant="h4" gutterBottom align="center">
                                🌟 Rate Your Experience with Drift
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom align="center">
                                Your experience matters to us! Share your thoughts and feedback with Drift! 🏎️💨
                            </Typography>
                            <form onSubmit={handleFeedbackSubmit}>
                                {/* Name Field */}
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{ marginBottom: '1rem' }}
                                />

                                {/* Emoji Reaction Picker */}
                                <ToggleButtonGroup
                                    value={reaction}
                                    exclusive
                                    onChange={handleReactionChange}
                                    aria-label="Reaction"
                                    sx={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}
                                >
                                    <ToggleButton value="😢" aria-label="Sad">😢</ToggleButton>
                                    <ToggleButton value="😕" aria-label="Meh">😕</ToggleButton>
                                    <ToggleButton value="😐" aria-label="Neutral">😐</ToggleButton>
                                    <ToggleButton value="🙂" aria-label="Happy">🙂</ToggleButton>
                                    <ToggleButton value="😁" aria-label="Very Happy">😁</ToggleButton>
                                </ToggleButtonGroup>

                                {/* Feedback Text Area */}
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    label="Your Feedback 💬"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    sx={{ marginBottom: '1rem' }}
                                />

                                {/* Submit Button */}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="submit-btn"
                                    disabled={submitted || loading} // Disable if submitted or loading
                                    startIcon={loading ? <CircularProgress size={20} /> : null}
                                >
                                    {submitted ? '🎉 Thank You for Your Feedback!' : '📮 Submit Feedback'}
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
