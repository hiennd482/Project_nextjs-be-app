import CommonListing from "@/components/CommonListing";
import CommonListingClient from "@/components/CommonListing/CommonListingClient";
import { productByCategory } from "@/services/product";

export default async function KidsAllProducts() {
  const getAllProducts = await productByCategory("nuocuong");

  return <CommonListingClient data={getAllProducts && getAllProducts.data} />;
}
