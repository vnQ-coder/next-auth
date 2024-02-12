import ProductCard from "./page.client";
import { redirect } from "next/navigation";
import { use } from "react";

async function getProduct(id: string) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();
  return data;
}

const ProductDetail = ({ productId }: { productId: string | undefined }) => {
  if (!productId) {
    return redirect("/");
  }
  const data = use(getProduct(productId));

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-1/4">
        <ProductCard product={data} />
      </div>
    </div>
  );
};

export default ProductDetail;
