"use client";

import Image from "next/image";
import { Button } from "../Button/Button";
import { textLimit } from "@/lib/helpers";
import { Input } from "../Input/Input";
import { LegacyRef } from "react";
import { IMaskMixin } from "react-imask";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addOrder, deleteOrder } from "@/lib/reducers/shopSlice";

const OrderInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input
    {...props}
    ref={inputRef as LegacyRef<HTMLInputElement>}
    className="text-center"
  />
));

export const CatalogCard = (props: IProduct) => {
  const { title, image_url, description, price, id } = props;
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.shop.cart);
  const count = cart.some((item) => item.id === id)
    ? cart.filter((item) => item.id === id)[0].count
    : 0;

  const handleAdd = () => {
    const addCount = count < 99 ? count + 1 : count;
    dispatch(
      addOrder({
        id,
        name: title,
        count: addCount,
        price: price * addCount,
      })
    );
  };

  const handleRemove = () => {
    const removeCount = count - 1;
    removeCount
      ? dispatch(
          addOrder({
            id,
            name: title,
            count: removeCount,
            price: price * removeCount,
          })
        )
      : dispatch(deleteOrder({ id }));
  };

  const handleChange = (value: string) => {
    const newCount = Number(value);
    newCount &&
      dispatch(
        addOrder({
          id,
          name: title,
          count: newCount,
          price: price * newCount,
        })
      );
  };

  return (
    <div className="bg-paper rounded-[15px] overflow-hidden p-[10px] max-w-[332px] grid grid-rows-[1fr_auto] break-all">
      <div className="overflow-hidden">
        <div className="relative w-full h-[366px] [&>img]:object-cover [&>img]:static overflow-hidden rounded-[15px]">
          <Image
            src={image_url}
            fill
            alt={title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="text-[36px] leading-normal whitespace-nowrap overflow-hidden text-ellipsis my-2">
          {title}
        </div>
        <div>{textLimit(description, 100)}</div>
      </div>
      <div>
        <div className=" text-[36px] leading-normal text-center my-3 lg:my-8">{`${price}₽`}</div>
        {count ? (
          <div className="grid grid-cols-[64px_1fr_64px] gap-2">
            <Button onClick={handleRemove}>-</Button>
            <OrderInput
              mask={"00"}
              min={1}
              value={String(count)}
              onAccept={(value: string) => {
                handleChange(value);
              }}
              onBlur={(e: { target: { value: any } }) => {
                const value = e.target.value;
                handleChange(value || 1);
              }}
            />
            <Button onClick={handleAdd}>+</Button>
          </div>
        ) : (
          <Button className="w-full" onClick={handleAdd}>
            Купить
          </Button>
        )}
      </div>
    </div>
  );
};
