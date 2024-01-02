export const addItem = (item) => ({
    type: 'ADD_ITEM',
    payload: item,
});

export const removeItem = (itemId) => ({
    type: 'REMOVE_ITEM',
    payload: itemId,
});