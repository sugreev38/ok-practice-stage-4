"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/cart";
import { useRouter } from "next/navigation";
const ProductCard = ({ product }: any) => {
  const { addItemToCart } = useCart();
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => addItemToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

const CartItem = ({ item }: any) => {
  const { removeItemFromCart } = useCart();
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 mr-4" />
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-gray-600">${item.price}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
        </div>
      </div>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => removeItemFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

const Cart = ({ cartItems }: any) => {
  const router = useRouter();
  const totalPrice = cartItems?.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Cart ({cartItems?.length || 0})
      </h2>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems?.map((item: any) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="mt-4">
            <p className="font-semibold">Total: ${totalPrice?.toFixed(2)}</p>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => router.push("/checkout")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Cart cartItems={cartItems} />
    </div>
  );
};

export default ProductsPage;