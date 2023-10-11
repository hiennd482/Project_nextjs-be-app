import CommonDetails from "@/components/CommonDetails";
import { getAllAdminProducts, productById } from "@/services/product";

export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);
  const allPrd = await getAllAdminProducts();

  return (
    <CommonDetails
      item={productDetailsData && productDetailsData.data}
      allPrd={allPrd && allPrd.data}
    />
  );
}
