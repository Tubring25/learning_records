import { getProductById } from "./Menu.js"

export async function addToCart(id) {
    const product = await getProductById(id)
    const result = app.store.cart.filter(prodInCart => prodInCart.product.id == id)
    if (result.length) {
        app.store.cart = app.store.cart.map((c) =>
          c.product.id === id ? { ...c, quantity: ++c.quantity } : c
        );
      } else {
        app.store.cart = [...app.store.cart, { product, quantity: 1 }];
      }
    
    console.log(app.store.cart)
}

export async function removeFromCart(id) {
    app.store.cart = app.store.cart.filter(prodInCart => prodInCart.id != id)
}