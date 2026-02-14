export const getAllProducts = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=20");
  const data = await res.json();
  return data.products;
};

export const getProductById = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
};
