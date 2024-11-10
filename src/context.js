import React, { useReducer, useContext, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';

const AppContext = React.createContext();
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const remove = (id) =>{
    dispatch({type: 'REMOVE',payload: id})
  }

  const fetchData = async()=>{
    dispatch({type:"LOADING"});
    const response = await fetch(url);
    const cart = await response.json(response);
    dispatch({type:"DISPLAY_ITEMS", payload: cart});
  };

  useEffect(()=>{
    dispatch({type:'GET_TOTALS'})
  },[state.cart])

  return (
    <AppContext.Provider value={{ ...state, clearCart,remove }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
