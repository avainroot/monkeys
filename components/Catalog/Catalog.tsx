import { getCatalog } from "@/lib/api";
import { CatalogList } from "./CatalogList";

export const Catalog = async () => {
  const catalog = await getCatalog(1);
  return <CatalogList catalog={catalog} />;
};
