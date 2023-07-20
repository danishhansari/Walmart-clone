import Home from './pages/Home';
import Error404Screen from './pages/Error404Screen';
import Product from './pages/Product';
import { parseRequestUrl } from './utils';

const routes = {
  '/': Home,
  '/product/:id': Product,
};
const router = async () => {
  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const main = document.querySelector('.main');
  main.innerHTML = await screen.render();
  // await screen.after_render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
