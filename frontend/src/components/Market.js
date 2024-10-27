import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PieChart, Pie, Tooltip, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
  AppBar, Toolbar, Typography, IconButton,
  Menu, MenuItem, Button, Container,
  Grid, Paper, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Importing MoreVertIcon
import './Market.css';

export default function Market() {
  const [userName, setUserName] = useState('🙋');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const dataPie = [
    { name: 'Petrol', value: 400, fill: '#8C0032' },
    { name: 'Diesel', value: 300, fill: '#BA4A5D' },
    { name: 'Electric', value: 100, fill: '#D97A8C' },
    { name: 'Hybrid', value: 200, fill: '#F5BCC4' },
  ];

  const dataLine = [
    { month: 'Jan', price: 3000 },
    { month: 'Feb', price: 3200 },
    { month: 'Mar', price: 2800 },
    { month: 'Apr', price: 3500 },
  ];

  const dataBar = [
    { brand: 'Maruti', sales: 2400 },
    { brand: 'Honda', sales: 1398 },
    { brand: 'Toyota', sales: 9800 },
  ];

  const dataNewChart1 = [
    { name: 'Category A', value: 2400, fill: '#8C0032' },
    { name: 'Category B', value: 4567, fill: '#BA4A5D' },
    { name: 'Category C', value: 1398, fill: '#D97A8C' },
    { name: 'Category D', value: 9800, fill: '#F5BCC4' },
  ];

  const dataNewChart2 = [
    { month: 'Jan', profit: 4000 },
    { month: 'Feb', profit: 3000 },
    { month: 'Mar', profit: 5000 },
    { month: 'Apr', profit: 7000 },
  ];

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userName');
    if (loggedInUser) {
      setUserName(loggedInUser);
    }
  }, []);

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

      <Container className="market-container">
        <Typography
          variant="h3"
          gutterBottom
          className="market-header"
        >
          MARKET TRENDS
        </Typography>

        <Grid container spacing={4}>
          {/* Fuel Type Market Share Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="market-paper">
              <Typography variant="h5" gutterBottom>
                FUEL TYPE MARKET SHARE
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataPie}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Price Trends Over Time Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="market-paper">
              <Typography variant="h5" gutterBottom>
                PRICE TRENDS OVER TIME
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataLine}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#8C0032" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Top-Selling Brands Bar Chart */}
          <Grid item xs={12}>
            <Paper elevation={3} className="market-paper">
              <Typography variant="h5" gutterBottom>
                TOP-SELLING BRANDS
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataBar}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="brand" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8C0032" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Two New Side-by-Side Charts */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="market-paper">
              <Typography variant="h5" gutterBottom>
                CATEGORY A-D SALES
              </Typography>
              <Typography variant="body2" gutterBottom>
                This chart represents sales data for different categories from A to D. Category A represent compact vehicles, Category B represent midsize vehicles, Category C represent luxury vehicles, and Category D represent SUVs or trucks.
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataNewChart1}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="market-paper">
              <Typography variant="h5" gutterBottom>
                PROFIT TRENDS OVER TIME
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataNewChart2}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="profit" stroke="#8C0032" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
