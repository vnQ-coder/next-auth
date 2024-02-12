"use client";

import ProductCard from "./page.client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

async function getProducts(limit: number) {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit}`
  );
  const data = await response.json();
  return data;
}

const Products = () => {
  const initialLimit = 10;
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(initialLimit);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getProducts(limit);
      setData((prevData): any => [...prevData, ...newData]);
    };
    fetchData();
    // if (inView) {
    //   fetchData();
    //   setLimit((prevLimit) => prevLimit + initialLimit);
    // } else {
    //   fetchData();
    // }
  }, []);

  useEffect(() => {
    if (inView) {
      console.log(inView, "inView");
    }
  }, [inView]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.map((product: Product, index: number) => (
        <ProductCard product={product} key={`${product.id}-${index}`} />
      ))}
      <div ref={ref}></div>
    </div>
  );
};

export default Products;
