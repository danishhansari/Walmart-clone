import { getProduct } from "../api";
import { parseRequestUrl, rerender } from "../utils";
import { getCartItems, setCartItems } from "../localStorage";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(x => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(Cart);
  }
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product.id === id));
    if(id === parseRequestUrl().id){
        document.location.hash = '/cart'
    }else{
        rerender(Cart)
    }
}
const Cart = {
  after_render: () => {
    const qtySelects = document.querySelector(".qty-select");
    Array.from(qtySelects).forEach( qtySelect => {
      qtySelect.addEventListener('change', e => {
        const item = getCartItems().find(x => x.product === qtySelect.id);
        console.log(e.target.value)
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const deleteBtns = document.querySelectorAll('.delete-btn')
    Array.from(deleteBtns).forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () => {
            removeFromCart(deleteBtn.id)
        })
    });
    document.querySelector('#checkout-btn').addEventListener('click', () => {
        document.location.hash = '/signin'; 
    })
  }, 
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `
        <div class="cart flex max-w-[1200px] mx-auto p-4 gap-4">
        <div class="cart-list w-[60%] p-4">
        <ul class="cart-list-container">
        <li class="flex justify-between">
        <h2 class="text-3xl font-medium">Shopping Cart</h2>
        <h2 class="text-3xl font-medium">Price</h2>
        </li>
        ${
          cartItems.length === 0
            ? '<div>Cart is empty. <a href="/#/">Go Shopping</a></div>'
            : cartItems
                .map(
                  (item) => `
        <li class="flex justify-between my-6 border-b border-t py-2">
        <div class="cart-img w-[200px] h-[200px]">
        <img  src="${item.image}" class="w-full h-[100%] rounded-lg" alt="${
                    item.name
                  }" />
        </div>
        <div class="cart-name">
        <div class="mt-8">
        <a href="/#/product/${item.product}" class="text-2xl font-semibold" >${
                    item.name
                  } </a>
        </div>
        <div class="text-2xl font-semibold my-2">
        Qty: <select class="qty-select w-[100%] px-2 py-1" id="${item.product}">
        ${[...Array(item.countInStock).keys()].map((x) =>
          item.qty === x + 1
            ? `<option selected value="${x + 1}">${x + 1}</option>`
            : `<option value="${x + 1}">${x + 1}</option>`
        )}
        </select>
        <button type="button" class="delete-btn block text-2xl bg-blue-500 mt-4 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-75" id="${
          item.product
        }">Delete</button>
        </div>
        </div>
        <div class="price text-3xl font-semibold mr-2 mt-8">$${item.price}</div>
        </li>
        `
                )
                .join("\n")
        }
        </ul>
        </div>
        <div class="cart-action mt-[8em]">
        <div class="p-4">
        <h3 class="text-3xl font-medium text-zinc-800">Subtotal <span class="font-semibold">(${cartItems.reduce(
          (a, c) => a + c.qty,
          0
        )}  items)</span>: <span class="font-semibold text-blue-600">$${cartItems.reduce(
      (a, c) => a + c.price * c.qty,
      0
    )}</span></h3>
        <button id="checkout-btn" class="text-2xl py-3 px-4 text-center bg-blue-500 text-white block my-4 w-full rounded-lg hover:bg-blue-600 transition-colors duration-75 font-semibold">Proceed to Checkout</button>
        </div>
        </div>
        </div>`;
     }
};
export default Cart;
