import CommonListing from "@/components/CommonListing";
import CommonListingClient from "@/components/CommonListing/CommonListingClient";
import { productByCategory } from "@/services/product";

export default async function MenAllProducts() {
  const getAllProducts = await productByCategory("rau");

  return <CommonListingClient data={getAllProducts && getAllProducts.data} />;
}
