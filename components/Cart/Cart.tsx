"use client";

import { textLimit, trimPhone } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "../Button/Button";
import { IMaskMixin } from "react-imask";
import { LegacyRef, useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { useFormik } from "formik";
import { validateOrder } from "@/lib/validators";
import { sendOrder } from "@/lib/api";
import { cleanCart } from "@/lib/reducers/shopSlice";
import { Modal } from "../Modal/Modal";

const PhoneInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input
    {...props}
    ref={inputRef as LegacyRef<HTMLInputElement>}
    className="text-center sm:text-left"
  />
));

const validate = validateOrder();

export const Cart = () => {
  const cart = useAppSelector((state) => state.shop.cart);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState<string | boolean>(false);
  const initialValues: IOrderValues = {
    phone: "_",
    cart: [],
  };

  useEffect(() => {
    const savedPhone = localStorage.getItem("userPhone");
    savedPhone && formik.setFieldValue("phone", trimPhone(savedPhone));
  }, []);

  useEffect(() => {
    const cartValue = cart.map(({ id, count }) => {
      return { id, quantity: count };
    });
    formik.setFieldValue("cart", cartValue);
  }, [cart]);

  const handleOrder = async ({ phone, cart }: IOrderValues) => {
    sendOrder({ phone, cart }).then((result) => {
      if (result.success) {
        dispatch(cleanCart());
        localStorage.setItem("userPhone", phone);
      }
      setOpenModal(result.success ? "Заказ успешно выполнен!" : result.error);
      setTimeout(() => {
        setOpenModal(false);
      }, 4000);
      return result.error;
    });
  };

  const formik = useFormik({
    initialValues,
    validate,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: (values) => handleOrder(values),
  });

  return (
    <div className="bg-paper rounded-[15px] sticky lg:p-[10px] px-[11px] pt-[18px] pb-[14px] top-0 z-10 max-w-[708px] mx-auto w-full mt-[164px] lg:mt-[243px] shadow-xl">
      <div
        className="text-center lg:text-left text-[36px] mb-4"
        onClick={() => setOpenModal(true)}
      >
        Добавленные товары
      </div>
      {cart.length ? (
        <table className="w-full">
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="w-full break-all py-1">
                  {textLimit(item.name, 30)}
                </td>
                <td className="px-4">x{item.count}</td>
                <td>{item.price}₽</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Корзина пуста!"
      )}

      <form
        onSubmit={formik.handleSubmit}
        className="grid sm:grid-cols-[1fr_268px] gap-[10px] sm:gap-4 mt-[32px] sm:mt-[20px]"
        autoComplete="false"
      >
        <PhoneInput
          mask={"+{7} (000) 000-00-00"}
          lazy={false}
          value={formik.values.phone}
          onAccept={(value: string) => {
            formik.setFieldValue("phone", trimPhone(value));
          }}
          name="phone"
          id="phone"
          error={formik.errors.phone}
        />
        <Button type="submit">Заказать</Button>
      </form>

      <Modal open={openModal} setOpen={setOpenModal} />
    </div>
  );
};
