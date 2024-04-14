interface IReview {
  id: number;
  text: string;
}

interface IOrder {
  id: number;
  name: string;
  count: number;
  price: number;
}

interface IShop {
  cart: IOrder[];
}

interface IProduct {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

interface ICatalog {
  page: number;
  amount: number;
  total: number;
  products: IProduct[];
}

interface IOrderValues {
  phone: string;
  cart: {
    id: number;
    quantity: number;
  }[];
}
