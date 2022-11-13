import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    // get products data
    const productsData = await fetch('http://localhost:5000/products');
    const { products } = await productsData.json();

    // get cart data
    const savedCart = getStoredCart();
    const initialCart = [];
    for (const _id in savedCart) {
        const addedProduct = products.find(product => product._id === _id);
        if (addedProduct) {
            const quantity = savedCart[_id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }

    return { products, initialCart };
}