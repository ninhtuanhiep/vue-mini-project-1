import { currentUser } from "./auth";

export function getCartKey() {
  const user = currentUser.value;

  if (!user) {
    return null;
  }

  return `cart_user_${user.id}`;
}

export function getCart() {
  const cartKey = getCartKey();

  if (!cartKey) {
    return [];
  }

  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

export function saveCart() {
  const cartKey = getCartKey();

  if (!cartKey) {
    return;
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
}

export function addProductToCart(product) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.unshift({
      ...product,
      quantity: 1,
    });
  }

  saveCart(cart);

  return cart;
}
