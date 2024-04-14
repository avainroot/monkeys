// import Image from "next/image";

import { Cart } from "@/components/Cart/Cart";
import { Catalog } from "@/components/Catalog/Catalog";
import { ReviewsList } from "@/components/Reviews/ReviewsList";
import { Title } from "@/components/Title/Title";

export default function Home() {
  return (
    <div className="">
      <Title>Тестовое задание</Title>
      <ReviewsList />
      <Cart />
      <Catalog />
    </div>
  );
}
