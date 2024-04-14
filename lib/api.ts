import { API_URL, CATALOG_PAGESIZE } from "./constants";

const apiOptions: RequestInit = {
  headers: {
    "content-type": "application/json",
  },
  cache: "no-store",
};

export async function getReviews() {
  const res = await fetch(`${API_URL}reviews`, apiOptions);
  const reviews = await res.json();
  return reviews as IReview[];
}

export async function getCatalog(page: number) {
  const res = await fetch(
    `${API_URL}products?page=${page}&page_size=${CATALOG_PAGESIZE}`,
    apiOptions
  );
  const catalog = await res.json();
  return catalog as ICatalog;
}

export async function sendOrder(order: IOrderValues) {
  const res = await fetch(`${API_URL}order`, {
    method: "POST",
    body: JSON.stringify(order),
    ...apiOptions,
  });
  const statusOrder = await res.json();
  return statusOrder;
}
