import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    AppBar, Toolbar, Typography, IconButton,
    Menu, MenuItem, TextField, Button, Container,
    Grid, Paper, Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Your CSS file

export default function Home() {
    const [formData, setFormData] = useState({
        carName: '', fuelType: '', sellerType: '', transmissionType: '', year: '',
        kmDriven: '', previousOwners: '', mileage: '', engineCapacity: '',
        maxPower: '', seats: '', torque: ''
    });
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [userName, setUserName] = useState('🙋');
    const [anchorEl, setAnchorEl] = useState(null);
    const [carImage, setCarImage] = useState(null); // State for random car image
    const navigate = useNavigate();

    const carImages = [
        'https://i.pinimg.com/enabled_hi/564x/ea/54/b3/ea54b336aeed70907594cddc69e35414.jpg',
        'https://i.pinimg.com/564x/47/f5/20/47f5200739e9453fc694b231169b6f67.jpg',
        'https://i.pinimg.com/564x/bf/bf/f0/bfbff01c79813631c5d5b425b542798c.jpg',
        'https://i.pinimg.com/564x/cb/c6/a1/cbc6a1124819e13ec70d3bea5e633e31.jpg',
        'https://i.pinimg.com/enabled_hi/564x/98/9c/aa/989caa9bf4904c29961a8e13251d7f61.jpg',
        'https://i.pinimg.com/564x/c9/15/0f/c9150faaa63f1c0fccf696260c6fd3ed.jpg',
        'https://i.pinimg.com/564x/85/0f/67/850f67248c5a31e3369248856cf39bf3.jpg',
        'https://i.pinimg.com/564x/78/1e/c5/781ec5e7c17eec981ad2e5c065dfb19f.jpg',
        'https://i.pinimg.com/enabled_hi/564x/53/1a/be/531abe84cf621781d7e3782ed4ff483a.jpg',
    ];

    useEffect(() => {
        const loggedInUser = localStorage.getItem('userName');
        if (loggedInUser) {
            setUserName(loggedInUser);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // Log form data for debugging

        try {
            const response = await axios.post('http://127.0.0.1:5001/predict', formData);
            setPredictedPrice(response.data.predicted_price);

            // Select a random car image after predicting the price
            const randomImage = carImages[Math.floor(Math.random() * carImages.length)];
            setCarImage(randomImage);
        } catch (error) {
            console.error('Error predicting price:', error.response ? error.response.data : error.message);
            alert('Error predicting price. Please try again.');
        }
    };

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
                    <Typography variant="h6" className="navbar-logo">Drift</Typography>
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

            {/* Main Content Area */}
            <Container maxWidth="lg" className="home-container">
                <Grid container spacing={4} className="home-grid">
                    {/* Left Side: Form */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={6} className="form-paper">
                            <Typography variant="h4" gutterBottom>
                                Car Price Prediction
                            </Typography>
                            <form onSubmit={handlePredict}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="carName"
                                            label="Car Name"
                                            variant="outlined"
                                            value={formData.carName}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="fuelType"
                                            label="Fuel Type"
                                            variant="outlined"
                                            value={formData.fuelType}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="sellerType"
                                            label="Seller Type"
                                            variant="outlined"
                                            value={formData.sellerType}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="transmissionType"
                                            label="Transmission Type"
                                            variant="outlined"
                                            value={formData.transmissionType}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="year"
                                            label="Year"
                                            variant="outlined"
                                            type="number"
                                            value={formData.year}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="kmDriven"
                                            label="Kilometers Driven"
                                            variant="outlined"
                                            type="number"
                                            value={formData.kmDriven}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="previousOwners"
                                            label="Previous Owners"
                                            variant="outlined"
                                            type="number"
                                            value={formData.previousOwners}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="mileage"
                                            label="Mileage (km/l)"
                                            variant="outlined"
                                            type="number"
                                            value={formData.mileage}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="engineCapacity"
                                            label="Engine Capacity (cc)"
                                            variant="outlined"
                                            type="number"
                                            value={formData.engineCapacity}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="maxPower"
                                            label="Max Power (bhp)"
                                            variant="outlined"
                                            type="number"
                                            value={formData.maxPower}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="seats"
                                            label="Number of Seats"
                                            variant="outlined"
                                            type="number"
                                            value={formData.seats}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="torque"
                                            label="Torque (Nm)"
                                            variant="outlined"
                                            type="number"
                                            value={formData.torque}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Predict Price
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>

                    {/* Right Side: Image and Prediction */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={6} className="image-paper">
                            {carImage && (
                                <img src={carImage} alt="Random Car" className="random-car-image" />
                            )}
                            {predictedPrice && (
                                <Typography variant="h5" className="predicted-price">
                                    Predicted Price: ₹{predictedPrice}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
