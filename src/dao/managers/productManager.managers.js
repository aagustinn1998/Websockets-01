import { productModel } from "../models/productManager.models.js";

export default class ProductManagerDao {
  //  recibe un argumento con valor predeterminado de 20 
  getAllProducts = async (limit = 20) => {
    try {
      const allProducts = await productModel.find({}).limit(limit);
      return allProducts; //devuelve un arreglo de todos los productos en la base de datos
    } catch (error) {
      console.log("🚀 ~ file: productManager.managers.js:8 ~ ProductManagerDao ~ getAllProducts= ~ error:", error);
    }
  };

  getProductById = async (id) => {  //recibe un id como argumento y devuelve el producto correspondiente
    try {
      const product = await productModel.findOne({ _id: id });
      return product;
    } catch (error) {
      console.log("🚀 ~ file: productManager.managers.js:18 ~ ProductManagerDao ~ getProductById= ~ error:", error);
    }
  };

  removeProduct = async (id) => { //recibe un id como argumento y elimina el producto de la base de datos
    try {
      await productModel.deleteOne({ _id: id });
    } catch (error) {
      console.log("🚀 ~ file: productManager.managers.js:27 ~ ProductManagerDao ~ removeProduct= ~ error:", error);
    }
  };

  async addProduct(product) { //recibe el producto de la base de dato
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error("Data missing. All data is required");
    }

    try {
      const newCar = await productModel.create(product);
      return newCar;
    } catch (error) {
      console.log("🚀 ~ file: productManager.managers.js:46 ~ ProductManagerDao ~ addProduct ~ error:", error);
    }
  }

  async updateProduct(idToUpdate, productToUpdate) {
    try {
      const product = await productModel.updateOne({ _id: idToUpdate }, productToUpdate);
      return product;
    } catch (error) {
      console.log("🚀 ~ file: productManager.managers.js:57 ~ ProductManagerDao ~ updateProduct ~ error:", error);
    }
  }
}
