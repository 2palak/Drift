import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton,
  Menu, MenuItem, Button, Container,
  Grid, Paper, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Importing MoreVertIcon
import './Details.css';

export default function Details() {
  const [userName, setUserName] = useState('🙋');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userName');
    if (loggedInUser) {
      setUserName(loggedInUser);
    }
  }, []); // UseEffect is now correctly placed inside the Details function.

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

  // New handlers for navigation
  const handleMarketTrends = () => {
    navigate('/market'); // Navigating to Market.js
  };

  const handleDetails = () => {
    navigate('/details'); // Navigating to Details.js
  };

  const handleReviews = () => {
    navigate('/reviews'); // Navigating to Reviews.js
  };

  const carData = {
    "Vintage Cars": [
      {
        name: "Ford Mustang 67",
        img: "https://i.pinimg.com/enabled_hi/564x/f5/a0/22/f5a022f93d6289345e8587a7c2357858.jpg",
        fact: "A classic American muscle car known for its performance and style."
      },
      {
        name: "Porsche 993 GT2",
        img: "https://i.pinimg.com/enabled_hi/474x/23/71/62/237162bf22dd87dff8ee7e948644df6e.jpg",
        fact: "One of the most iconic Porsches, known for its speed and design."
      },
      {
        name: "Rolls Royce Silver Cloud",
        img: "https://i.pinimg.com/564x/f6/0c/e9/f60ce9f35c98d6ba2cc046fe6bb00fbd.jpg",
        fact: "Represented luxury and comfort in its time, a true classic."
      },
    ],
    "Luxury Cars": [
      {
        name: "Lamborghini Countach",
        img: "https://i.pinimg.com/736x/9e/74/04/9e7404a239cf697324cf0edae3c8eb48.jpg",
        fact: "An iconic supercar that defined the automotive industry."
      },
      {
        name: "Mercedes Maybach S-Class",
        img: "https://i.pinimg.com/564x/69/e6/80/69e6809f004317ac7a72d9cf6c9cb416.jpg",
        fact: "A symbol of luxury and sophistication."
      },
      {
        name: "Jaguar E-Type",
        img: "https://i.pinimg.com/564x/eb/9a/37/eb9a37c46c9c73183149d7053312809b.jpg",
        fact: "Known for its beauty and performance."
      },
    ],
    "Hatchbacks": [
      {
        name: "Volkswagen Golf",
        img: "https://i.pinimg.com/564x/3c/3a/fe/3c3afe1e8cefaf343792920c3d0f85f4.jpg",
        fact: "A globally popular car known for its versatility and performance."
      },
      {
        name: "Honda Civic",
        img: "https://i.pinimg.com/564x/b4/04/73/b40473327f324c2cc8f1ba3976209d64.jpg",
        fact: "A compact car with great reliability and sporty performance."
      },
      {
        name: "1957 Pontiac",
        img: "https://i.pinimg.com/564x/53/ab/8a/53ab8aa48bb5114420c2acf1165b2b37.jpg",
        fact: "A classic that reflects the golden age of American cars."
      },
    ],
    "Sports Cars": [
      {
        name: "Ferrari 488",
        img: "https://i.pinimg.com/564x/2a/c3/39/2ac3390ee25a803af1db718684fbf7ab.jpg",
        fact: "A masterpiece of Italian engineering."
      },
      {
        name: "Bugatti Chiron Sport",
        img: "https://i.pinimg.com/564x/9b/02/89/9b028955943865eaa7063fede56930f4.jpg",
        fact: "One of the fastest cars in the world."
      },
      {
        name: "Restomod 1958 Chevrolet Corvette",
        img: "https://i.pinimg.com/564x/b8/dc/13/b8dc134f9407d3b5ab6fef18dd8091a2.jpg",
        fact: "Combines classic style with modern performance."
      },
    ],
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" className="navbar">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" className="navbar-logo" component={Link} to="/home">Drift</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={handleDetails}>Details</Button>
            <Button color="inherit" onClick={handleMarketTrends}>Market Trends</Button>
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

      {/* Content */}
      <Container className="details-container">
        {Object.keys(carData).map((category) => (
          <div key={category}>
            <Typography variant="h4" gutterBottom className="details-category">
              {category}
            </Typography>
            <Grid container spacing={4}>
              {carData[category].map((car, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={3} className="details-paper">
                    <img src={car.img} alt={car.name} className="car-image" />
                    <Typography variant="h6" className="car-name">
                      {car.name}
                    </Typography>
                    <Typography variant="body1" className="car-fact">
                      {car.fact}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {/* Space after each category */}
            <div className="category-spacing" />
          </div>
        ))}
      </Container>
    </>
  );
}
