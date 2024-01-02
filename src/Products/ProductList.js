import React, {  useRef } from "react";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux-cart/Actions';

import { products } from './Moc'

import './style.css'

const ProductList = () => {

  const dispatch = useDispatch();
  useSelector((state) => console.log(state))

  const { items } = useSelector((state) => state.cartReducer)

  const handleAddToCart = (product) => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    }));

    iconButtonRef.current.classList.add('shake');
    setTimeout(() => {
      iconButtonRef.current.classList.remove('shake');
    }, 400); // 400 milliseconds เท่ากับความยาวของ animation

  };



  const iconButtonRef = useRef(null);



  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar>
          <RamenDiningIcon sx={{ mr: 2 }} fontSize='large' />
          <Typography variant="h3" color="inherit" noWrap>
            ร้านอาหารบ้านสวน
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            sx={{
              color: '#fff',
              border: '2px solid #fff', // Set the border style
              borderRadius: '50%', // Optional: Make it round
              '&:hover': {
                backgroundColor: '#fff', // Optional: Change background on hover
                color: '#263238'
              },
            }}

            ref={iconButtonRef}>
            <Badge badgeContent={items.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: { xs: 6, sm: 8 }, marginTop: '50px' }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {products.map((product, index) => (
            <Grid item key={index} xs={12} sm={8} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image={product.img}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>
                    {product.detail}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                    <Typography>
                      ราคาสินค้า
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {product.price}
                    </Typography>
                  </Box>

                  <IconButton
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      border: '2px solid #1565C0', // Set the border style
                      borderRadius: '50%', // Optional: Make it round
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: Change background on hover
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProductList;
