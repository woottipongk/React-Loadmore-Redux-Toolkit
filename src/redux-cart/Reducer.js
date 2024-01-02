const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);

            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }

            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

            return { ...state };
            
        case 'REMOVE_ITEM':
            const itemIdToRemove = action.payload;
            const updatedItems = state.items.filter((item) => item.id !== itemIdToRemove);
            return {
                ...state,
                items: updatedItems,
                totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
                totalPrice: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
            };
        default:
            return state;
    }
};

export default cartReducer;