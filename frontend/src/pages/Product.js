import  { parseRequestUrl } from "../utils";
import { getProduct } from "../api";
import Rating  from '../components/Rating'

const Product = {
    after_render:  () => {
    const request = parseRequestUrl()
    document.querySelector('#add-btn').addEventListener('click', () => {
       document.location.hash= `/cart/${request.id}`
    })
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<h1 class="text-4xl font-semibold">${product.error}</h1>`;
    }
    return `
    <div class="product max-w-[1500px] mx-auto relative">
    <a href="/#" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold transition-colors duration-75 absolute top-0 left-0"><i class="fa fa-chevron-left"></i></a>
    <div class="product-img max-w-[800px] mx-auto flex my-8" >
    <div class="flex flex-col gap-4 justify-between items-center mr-4 self-center">
    <img class="w-[80px] rotate-6" src="${product.image}" alt="${product.name}">
    <img class="w-[80px] rotate-12" src="${product.image}">
    <img class="w-[80px]" src="${product.image}">
    <img class="w-[80px] rotate-[-12deg]" src="${product.image}">
    <img class="w-[80px] rotate-[-18deg]" src="${product.image}">
    </div>
    <img class="w-[60%]" src="${product.image}">
    <div class="product-title p-8">
    <h1 class="text-3xl mt-16 font-medium">${product.name}</h1>
    <p class="text-xl my-2">${product.brand}</p>
    <p class="text-xl my-2">${Rating.render({value: product.rating, text: `${product.numReview} reviews`})}</p>
    <p class="text-3xl my-4">Price: <span class="font-bold text-blue-500">$${product.price}</span></p>
    <div class="order">
    <button class="block text-2xl text-center w-full bg-blue-500 mb-3 text-white py-2 border-2 font-semibold hover:bg-white hover:text-blue-500 hover:border-blue-600 transition-colors duration-75 rounded-lg"><i class="fas fa-shopping-cart"></i> Order Now</button>
    <button class="block text-2xl text-center w-full border-blue-500 text-blue-500 py-2 font-semibold border-2 mb-3 hover:bg-blue-600 hover:text-white transition-colors duration-75 rounded-lg hover:border-1" id="add-btn">Add to Cart</button>
    </div>
    <p class="text-2xl capitalize text-zinc-500">${product.category}</p>
    <p class="border-2 border-blue-500 inline-block py-2 px-3 rounded-lg my-4 text-blue-500 font-semibold">Stock Left: ${product.countInStock}<p>
    </div>
    </div>
    </div>
    `;
  },
};
export default Product;
