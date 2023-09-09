export type HostelData = {
  id: string;
  title: string;
};


export type FoodData = {
  name: string,
  price: number,
  description: string,
  availability: boolean,
  foodType: string,
  imageUrl: string
}

export type CartData = {
  name: string,
  price: number,
  quantity: number,
  foodType: string,
}

export type Orders = {
  orderId: number;
  title: string;
  price: number;
  description: string;
  hostel: HostelData | undefined;
  time: Date;
  orderStatus: string;
}
 