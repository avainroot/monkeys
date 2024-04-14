"use client";

import { getCatalog } from "@/lib/api";
import { useEffect, useState } from "react";
import { CatalogCard } from "./CatalogCard";
import { useInView } from "react-intersection-observer";
import { CATALOG_PAGESIZE } from "@/lib/constants";
import Image from "next/image";

export const CatalogList = ({ catalog }: { catalog: ICatalog }) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(catalog.page);
  const [productsList, setProductsList] = useState<IProduct[]>(
    catalog.products
  );

  const pagesCount = Math.ceil(catalog.total / CATALOG_PAGESIZE);

  const showMore = async () => {
    setIsLoading(true);
    await getCatalog(page + 1).then((result) => {
      setTimeout(() => {
        setPage(page + 1);
        setIsLoading(false);
        setProductsList([...productsList, ...result.products]);
      }, 1000);
    });
  };

  useEffect(() => {
    if (inView && page < pagesCount && !isLoading) showMore();
  }, [inView]);

  return (
    <div className="w-full">
      <div className="flex justify-center max-w-[973px] w-full mt-[45px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px] lg:gap-x-[35px] lg:gap-y-[42px]">
          {productsList.map((product) => (
            <CatalogCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      {page < pagesCount && (
        <div className="flex justify-center min-h-[124px] pt-6">
          {isLoading && (
            <Image
              src="/loader.gif"
              width={100}
              height={100}
              alt="Loading..."
              unoptimized
            />
          )}
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};
