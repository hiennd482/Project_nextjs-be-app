"use client";
import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export default async function AllProducts() {
  const getAllProducts = await getAllAdminProducts();
  console.log("first", getAllProducts.data);
  // return <CommonListing data={getAllProducts && getAllProducts.data} />;
  return <div>ádfsdf</div>;
}
