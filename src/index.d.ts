export type HostelData = {
  id: string;
  title: string;
};

export type Orders = {
  orderId: number;
  title: string;
  price: number;
  description: string;
  hostel: HostelData | undefined;
  time: Date;
  orderStatus: string;
}
 