export let getPriceQueryParams = (searchParams, key, value) => {
    let hasValueInParams = searchParams.has(key);
    if (value && hasValueInParams) {
        searchParams.set(key, value);
    } else if (value) {
        searchParams.append(key, value);
    } else if (hasValueInParams) {
        searchParams.delete(key);
    }
    return searchParams;
};
export let calculateOrderCost = (cartItems) => {
    let itemsPrice = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let shippingPrice = itemsPrice > 200 ? 0 : 25;
    let taxPrice =Number( (0.20 * itemsPrice).toFixed(2));
    let totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    return {
        itemsPrice: Number(itemsPrice).toFixed(2),shippingPrice,taxPrice,totalPrice,
    }
}