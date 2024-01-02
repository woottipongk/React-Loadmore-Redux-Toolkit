import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux-cart/Actions';

const Cart = () => {
    const cart = useSelector((state) => state.cartReducer)
    const dispatch = useDispatch();

    const handleRemoveItem = (itemId) => {
        dispatch(removeItem(itemId));
    };

    return (
        <div>
           
            <h2>Shopping Cart</h2>
            <ul>
                {cart.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.quantity} x {item.price} = {item.quantity * item.price}
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>รวมรายการ: {cart.totalItems}</p>
            <p>Total Price: {cart.totalPrice}</p>
        </div>
    );
};

export default Cart;