"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { initialCart } from "@/lib/reducers/shopSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => {
    const savedCart = localStorage.getItem("userCart");
    if (savedCart && storeRef.current)
      storeRef.current.dispatch(initialCart(JSON.parse(savedCart)));
  }, []);
  return <Provider store={storeRef.current}>{children}</Provider>;
}
