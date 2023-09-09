import {Orders} from '..';
import {hostelNames} from './hostelNames';

export enum OrderStatus {
  COMPLETED = 'completed',
  PREPARING = 'preparing',
}

export const sampleOrders: Orders[] = [
  {
    orderId: 1,
    title: 'Order 1',
    price: 100,
    description: 'This is order 1',
    hostel: hostelNames.at(2),
    time: new Date(),
    orderStatus: OrderStatus.PREPARING,
  },
  {
    orderId: 2,
    title: 'Order 2',
    price: 200,
    description: 'This is order 2',
    hostel: hostelNames.at(3),
    time: new Date(),
    orderStatus: OrderStatus.PREPARING,
  },
  {
    orderId: 3,
    title: 'Order 3',
    price: 300,
    description: 'This is order 3',
    hostel: hostelNames.at(4),
    time: new Date(),
    orderStatus: OrderStatus.COMPLETED,
  },
  {
    orderId: 4,
    title: 'Order 4',
    price: 300,
    description: 'This is order 3',
    hostel: hostelNames.at(4),
    time: new Date(),
    orderStatus: OrderStatus.COMPLETED,
  },
];
