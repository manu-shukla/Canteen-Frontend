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
