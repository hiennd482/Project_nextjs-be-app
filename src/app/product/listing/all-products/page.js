"use client";
import CommonListing from "@/components/CommonListing";
import CommonListingClient from "@/components/CommonListing/CommonListingClient";
import { getAllAdminProducts } from "@/services/product";

export default async function AllProducts() {
  const allAdminProducts = await getAllAdminProducts();
  return (
    <CommonListingClient data={allAdminProducts && allAdminProducts.data} />
  );
}
