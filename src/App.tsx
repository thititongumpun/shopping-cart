import { useState } from 'react';
import { useQuery } from 'react-query';

import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import { Wrapper } from './App.styles';

interface CartItemType {
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
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>somethin went wrong...</div>

  return (

    <div className="App">
      Start projects
    </div>
  );
}

export default App;
