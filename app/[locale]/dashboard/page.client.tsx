"use client";

import Button from "@/components/shared/Inputs/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={() => router.push(`?id=${product.id}`)}
    >
      <div className="relative h-48">
        <Image
          className="object-contain w-full h-full"
          src={product.image}
          alt={product.title}
          loading="eager"
          width={300}
          height={300}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700">${product.price}</p>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4">
          <Button
            onClick={() => {}}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
