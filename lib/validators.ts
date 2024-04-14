import { trimPhone } from "./helpers";

export const validateOrder = () => (values: IOrderValues) => {
  const errors: { [key: string]: string } = {};
  if (trimPhone(values.phone).length < 11) {
    errors.phone = "Укажите номер телефона!";
  }
  if (!values.cart.length) {
    errors.cart = "Пустая корзина!";
  }
  return errors;
};
