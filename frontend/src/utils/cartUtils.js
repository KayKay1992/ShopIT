export const addDecimals = (num) => {
    return (Math.round(num *100)/100).toFixed(2)
}

export const updateCart = (state) => {
     //calculate the items price
     state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

     //calculate the total shipping charges(if order is over $100 then free shipping charges otherwise it will be $10 charge)
     state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

     //calculate the total tax(15% tax)
     state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

     //calculate the total price.
     state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.taxPrice) + Number(state.shippingPrice));

     //Saving our cart in localstorage.
     localStorage.setItem('cart', JSON.stringify(state));

     return state;
}