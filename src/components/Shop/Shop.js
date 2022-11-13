import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

/* Pagination summary:
1. Total items => (count)
2. Items Per Page => (size)
3. Total Pages => (pages = count/size)
4. Current Page => (page)
*/

const Shop = () => {

    // const { count, products } = useLoaderData();
    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProducts(data.products);
            })
    }, [page, size])

    const pages = Math.ceil(count / size);


    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const _id in storedCart) {
            const addedProduct = products.find(product => product._id === _id);
            if (addedProduct) {
                const quantity = storedCart[_id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products]);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const handleAddToCart = (selectedProduct) => {
        // console.log(product);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    cart={cart}
                    clearCart={clearCart}
                >
                    <Link to='/orders'>
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>
            <div className="pagination">
                <div className='show'>
                    Show: <select onChange={event => setSize(event.target.value)}>
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div>
                    {
                        [...Array(pages).keys()].map(number => <button
                            key={number}
                            className={page === number && 'selected'}
                            onClick={() => setPage(number)}
                        >
                            {number + 1}
                        </button>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Shop;