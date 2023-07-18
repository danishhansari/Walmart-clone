import axios from 'axios';

const Home = {
  render: async () => {
    const response = await axios({
      url: 'http://localhost:5000/api/products',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response || response.statusText !== 'OK') {
      return '<div class="text-red-600>Error in getting Data</div>';
    }
    const products = await response.data;
    return `
        <ul class="product-list flex flex-wrap items-start justify-center">
        ${products.map(
    (product) => `
        <li class="max-w-[120px]">
                <a href="/#/product/${product.id}">
                <img src="${product.image}" class="w-[100px] h-[110px] rounded" alt="${product.name}">
                </a>
                <p class="amount">$${product.price} </p>
                <p class="title">${product.name}</p>
                <p class="brand text-zinc-500">${product.brand}</p>
                <p class="text-slate-800">Pickup Delivery</p>
            </li>`,
  )
}
        `;
  },
};
export default Home;
