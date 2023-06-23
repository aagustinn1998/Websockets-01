import { cartModel } from "../models/cartManager.models.js";
import ProductManagerDao from "./productManager.managers.js";



// creates a new shopping cart with an empty array of products
export default class CartManagerDao { 
  async createCart() {
    try {
      const newCartItem = await cartModel.create({ products: [] });
      return newCartItem;
    } catch (error) {
      console.log("🚀 ~ file: cartManager.managers.js:8 ~ CartManagerDao ~ error:", error);
    }
  } // retrieves all shopping carts with optional pagination limit

  getCart = async (limit = "20") => {
    try {
      const carts = await cartModel.find({}).limit(parseInt(limit));
      return carts;
    } catch (error) {
      console.log("🚀 ~ file: cartManager.managers.js:19 ~ CartManagerDao ~ getCart= ~ error:", error);
    }
  };// retrieves a specific shopping

  getCartById = async (id) => {
    try {
      const cart = await cartModel.findOne({ _id: id });
      return cart;
    } catch (error) {
      console.log("🚀 ~ file: cartManager.managers.js:28 ~ CartManagerDao ~ getCartById= ~ error:", error);
    }
  };

  // Add product to cart
  async addProductToCart(cartId, productId) {
    if (!cartId || !productId) {
      console.error("Need productId and cartId");
      return false;
    }
    // creates an instance of "ProductManagerDao" to retrieve the product by ID 

    const pm = new ProductManagerDao();

    const product = await pm.getProductById(productId);
    if (!product) {
      console.error("The product you are trying to update does not exist");
      return false;
    }

    const currentCart = await this.getCartById(cartId);
    console.log(
      "🚀 ~ file: cartManager.managers.js:48 ~ CartManagerDao ~ addProductToCart ~ currentCart:",
      currentCart
    ); // finds the index of the product in the cart's "products" array 

    const indexOfProductInCart = currentCart.products.findIndex((p) => p.productId === productId);
       // si el producto no está en el carrito, agrega el producto al carrito con una cantidad de 1; de lo contrario, incrementa la cantidad
    if (indexOfProductInCart < 0) {
      currentCart.products.push({
        productId: productId,
        quantity: 1,
      });
    } else {
      currentCart.products[indexOfProductInCart].quantity = currentCart.products[indexOfProductInCart].quantity + 1;
    }

    try {
      await cartModel.updateOne({ _id: cartId }, currentCart);
    } catch (error) {
      console.log("🚀 ~ file: cartManager.managers.js:63 ~ CartManagerDao ~ addProductToCart ~ error:", error);
    }

    return currentCart;
  }
}
