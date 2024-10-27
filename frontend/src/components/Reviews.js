import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    AppBar, Toolbar, Typography, IconButton,
    Menu, MenuItem, Button, Container,
    Grid, Paper, Box, CircularProgress, Rating
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

export default function Reviews() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName] = useState('🙋');
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    // Fetch feedbacks from the backend, including the correct userName
    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/feedbacks');
            const feedbackWithLikes = response.data.map(feedback => ({
                ...feedback,
                likes: localStorage.getItem(`likes_${feedback._id}`) || feedback.likes || 0, // Load likes from localStorage
                rating: feedback.rating || 3 // Default rating if not provided
            }));
            setFeedbacks(feedbackWithLikes);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            setLoading(false);
        }
    };

    // Handle like button click and save to localStorage
    const handleLikeClick = (feedback) => {
        const updatedLikes = parseInt(feedback.likes) + 1;
        const updatedFeedbacks = feedbacks.map(f => 
            f._id === feedback._id ? { ...f, likes: updatedLikes } : f
        );
        setFeedbacks(updatedFeedbacks);
        localStorage.setItem(`likes_${feedback._id}`, updatedLikes); // Persist likes in localStorage
    };

    // Handle rating change and save it
    const handleRatingChange = (feedback, newRating) => {
        const updatedFeedbacks = feedbacks.map(f =>
            f._id === feedback._id ? { ...f, rating: newRating } : f
        );
        setFeedbacks(updatedFeedbacks);
        // Optionally, you can persist the new rating to the backend here
    };

    // Menu handlers
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (option) => {
        setAnchorEl(null);
        if (option === 'logout') {
            localStorage.removeItem('userName');
            navigate('/');
        } else if (option === 'predictions') {
            navigate('/predictions');
        } else if (option === 'feedback') {
            navigate('/feedback');
        }
    };

    const handleAddReview = () => {
        navigate('/feedback');
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

            {/* Feedback Section */}
            <Container maxWidth="lg" className="reviews-container">
                <Typography variant="h4" className="market-header" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
                    User Reviews
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={4} className="reviews-grid">
                            {feedbacks.length > 0 ? (
                                feedbacks.map((feedback) => (
                                    <Grid item xs={12} md={6} key={feedback._id}>
                                        <Paper elevation={6} className="feedback-card" sx={{ padding: '1.5rem', borderRadius: '15px' }}>
                                            {/* User Name and Rating Row */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="h6" className="feedback-user">
                                                    {feedback.userName || 'Anonymous'} {/* Display backend userName */}
                                                </Typography>
                                                <Rating
                                                    name={`rating-${feedback._id}`}
                                                    value={feedback.rating}
                                                    onChange={(event, newValue) => handleRatingChange(feedback, newValue)}
                                                />
                                            </Box>
                                            {/* Feedback Text */}
                                            <Typography variant="body1" className="feedback-text" sx={{ marginTop: '1rem' }}>
                                                {feedback.feedback || 'No feedback provided'}
                                            </Typography>
                                            {/* Likes and Reaction Row */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleLikeClick(feedback)}>
                                                    <ThumbUpAltIcon color="primary" sx={{ marginRight: '0.5rem' }} />
                                                    <Typography variant="body2">{feedback.likes} Likes</Typography>
                                                </Box>
                                                <Typography variant="body2" className="feedback-reaction">
                                                    Reaction: {feedback.reaction || 'No reaction'}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant="h6" className="no-feedback">
                                    No feedback available.
                                </Typography>
                            )}
                        </Grid>

                        {/* Add User Review Button */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                            <Button 
                                variant="contained" 
                                style={{ backgroundColor: '#8C0032' }}  // Custom color for the button
                                onClick={handleAddReview} 
                                sx={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
                            >
                                Add User Review
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
        </>
    );
}
