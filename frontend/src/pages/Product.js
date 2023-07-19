import { parseRequestUrl } from '../utils'
import { getProduct } from '../api';

const Product = {
  render: async () => { 
    const request = parseRequestUrl();
    const product = await getProduct(request.id)
    if(product.error){
      return `<h1 class="text-4xl font-semibold">${product.error}</h1>`
    }
    return `<h1 class="text-4xl font-semibold">${product.name}</h1>`
  }
};
export default Product;
