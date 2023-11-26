import CommonListing from "@/components/CommonListing";
import CommonListingClient from "@/components/CommonListing/CommonListingClient";
import { productByCategory } from "@/services/product";

export default async function WomenAllProducts() {
  const getAllProducts = await productByCategory("ngucoc");

  return <CommonListingClient data={getAllProducts && getAllProducts.data} />;
}
