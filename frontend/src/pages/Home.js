import data from "../data.js";
const Home = {
  render: () => {
    const { products } = data;
    return `
        <ul class="product-list flex flex-wrap items-start justify-center">
        ${products.map(
          (product) => `
        <li class="max-w-[120px]">
                <a href="/#/product/${product.id}">
                <img src="${product.image}" class="w-[100px]" alt="${product.name}">
                </a>
                <p class="amount">$${product.price} </p>
                <p class="title">${product.name}</p>
                <p class="brand text-zinc-500">${product.brand}</p>
                <p class="text-slate-800">Pickup Delivery</p>
            </li>
        `
        )}
        `;
  }
}
export default Home;