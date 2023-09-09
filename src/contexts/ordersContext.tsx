import React, {createContext, useContext, useState} from 'react';
import {sampleOrders} from '../constants/sampleOrders';
import {Orders} from '..';

export type OrdersContextType = {
  orderList: Orders[];
  refreshOrdersList: () => void;
};
const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({children}: any) => {
  const [orderList, setOrderList] = useState<Orders[]>(sampleOrders);

  const refreshOrdersList = async () => {
    console.log('Order List Refreshed');
  };

  return (
    <OrdersContext.Provider value={{orderList, refreshOrdersList}}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrdersContext = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    return {
      orderList: [],
      refreshOrdersList: () => {},
    };
  }
  return context;
};
