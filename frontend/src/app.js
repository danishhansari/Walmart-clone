import Home from './pages/Home.js';
import Error404Screen  from './pages/Error404Screen.js'
import Product from './pages/Product.js';
import { parseRequestUrl } from './utits.js';
const routes = {
    '/' :Home,
    '/product/:id':Product,
}
const router = () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') + (request.id? '/:id':'') + 
    (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen
    const main = document.querySelector('.main')
    main.innerHTML = screen.render();
};
window.addEventListener('load', router)
window.addEventListener('hashchange', router)