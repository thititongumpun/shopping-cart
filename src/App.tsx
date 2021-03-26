import { useState } from 'react';
import { useQuery } from 'react-query';

import Item from './Item/Item';

import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import { Wrapper, StyledButton} from './App.styles';

export interface CartItemType {
  id: number;
  category: string;
  description: string;
  image: string;
  price: string;
  title: string;
  amount: string;
}

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await (fetch('https://fakestoreapi.com/products'))).json();
} 

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);
  
  const getTotalItems = (items: CartItemType[]) => null;

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>somethin went wrong...</div>

  return (
    <Wrapper>
      <Grid container spacing={3}>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart Here
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
