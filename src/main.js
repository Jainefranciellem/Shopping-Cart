import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import {
  createProductElement,
  createCartProductElement,
  prices,
} from './helpers/shopFunctions';

import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const elemento = document.createElement('h1');
const products = document.querySelector('.products');

const message = (param) => {
  if (param === 'error') {
    elemento.innerHTML = ' Algum erro ocorreu, recarregue a página e tente novamente';
    elemento.className = 'error';
    products.appendChild(elemento);
  } else {
    elemento.innerHTML = 'carregando...';
    elemento.className = 'loading';
    products.appendChild(elemento);
  }
};
const removeEl = () => elemento.remove();

const listProduct = async () => {
  try {
    message();
    const productList = await fetchProductsList('computador');
    removeEl();
    productList.forEach((element) => {
      const product = createProductElement(element);
      return products.appendChild(product);
    });
  } catch (error) {
    message('error');
  }
};

await listProduct();

const addCart = async () => {
  const buttons = document.querySelectorAll('.product__add');
  const cartProducts = document.querySelector('.cart__products');
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const getId = button.parentElement.firstChild.innerHTML;
      const product = await fetchProduct(getId);
      saveCartID(getId);
      prices();
      const element = createCartProductElement(product);
      return cartProducts.appendChild(element);
    });
  });
};

addCart();

const getLocalStorage = () => {
  const cartProducts = document.querySelector('.cart__products');
  const ids = getSavedCartIDs();
  ids.forEach(async (id) => {
    const product = await fetchProduct(id);
    const element = createCartProductElement(product);
    cartProducts.appendChild(element);
  });
};
getLocalStorage();
prices();
