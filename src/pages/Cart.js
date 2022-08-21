import React, { useEffect, useState } from "react";
import CartItem from "../components/CartComponents/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../redux/userSlice";
import { setCart, setCartTotal } from "../redux/cartSlice";
import { useHistory } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getProducts,
  setProductsStatus
} from "../redux/productsSlice";
import axios from "axios";

function Cart() {


  const { shoppingCart, orderTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [cratItem, setCartIyem] = useState([]);
  const history = useHistory();
  const { products, productsStatus } = useSelector((state) => state.products);
  const { loginWithPopup, user } = useAuth0();


  useEffect(() => {
    dispatch(getProducts());
  }, []);


  // REMOVE ITEM FUNCTION
  const onPressRemove = (singleItem) => {
    var cloneProductsStatus = JSON.parse(JSON.stringify(productsStatus));
    var cloneProducts = [...shoppingCart];
    shoppingCart.filter((item, index) => {
      if (item.item_id == singleItem.item_id) {
        //set size array and initial size
        if (index !== -1) {
          var removeItem = cloneProductsStatus.find((item) => item.item_id == singleItem.item_id);
          removeItem.isExceed = false;
          dispatch(setProductsStatus(cloneProductsStatus));
          cloneProducts.splice(index, 1);
          dispatch(setCart(cloneProducts));
        }
      }
    });
    const cloneTotal = parseFloat(orderTotal);
    const itemPrice = parseFloat(singleItem.price) * parseInt(singleItem.qty);
    dispatch(setCartTotal(cloneTotal - itemPrice));
  };

  // MIN ITEM FUNCTION
  const onPressMin = (singleItem) => {
    // var cloneProducts = [...shoppingCart];
    var cloneProducts = JSON.parse(JSON.stringify(shoppingCart));
    var item = cloneProducts.find((item) => item.item_id == singleItem.item_id);
    if (item.qty == 1) {
    } else {
      item.qty = item.qty - 1;
      item.amount = parseFloat(item.amount) - parseFloat(item.price);
      var cloneTotal = parseFloat(orderTotal);
      cloneTotal = cloneTotal - parseFloat(item.price);
      dispatch(setCartTotal(cloneTotal));
      dispatch(setCart(cloneProducts));
    }
  };

  // PLUS ITEM FUNCTION
  const onPressPlus = async (singleItem) => {
    var oldItem = products.find((item) => item._id == singleItem.item_id);
    var cloneProducts = JSON.parse(JSON.stringify(shoppingCart));
    var item = cloneProducts.find((item) => item.item_id == singleItem.item_id);
    if (oldItem.qty > item.qty) {
      item.qty = item.qty + 1;
      item.amount = parseFloat(item.amount) + parseFloat(item.price);
      var cloneTotal = parseFloat(orderTotal);
      cloneTotal = cloneTotal + parseFloat(item.price);
      dispatch(setCartTotal(cloneTotal));
      dispatch(setCart(cloneProducts));
    }
  };

  // PLUS ITEM FUNCTION
  const onPlaceOrder = async () => {
    if (user == undefined) {
      loginWithPopup();
    } else {
      await axios
        .get(`http://localhost:4000/fury/users/${user ? user.email : null}`)
        .then((res) => {
          if (res.data.isUser == false) {
            history.push("/fetch-user-info");
          } else {
            dispatch(setUserToken(res.data.token));
            history.push("/checkout");
          }
        })
        .catch((error) => { console.log(error) });
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">
              {shoppingCart.length} Items
            </h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>
          {shoppingCart.length == 0 ? (
            <h1 className="font-semibold text-2xl text-center border-b pb-8">
              Empty Cart
            </h1>
          ) : (
            shoppingCart.map((item) => (
              <div key={item.item_id}>
                <CartItem
                  catItem={item}
                  onClickRemove={() => onPressRemove(item)}
                  onClickMin={() => onPressMin(item)}
                  onClickPlus={() => onPressPlus(item)}
                />
              </div>
            ))
          )}

          <button
            onClick={() => history.push("/")}
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </button>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items x {shoppingCart.length}
            </span>
            <span className="font-semibold text-sm">Rs. {orderTotal}</span>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>Rs. {orderTotal}</span>
            </div>

            {shoppingCart.length == 0 ? (
              <button className="bg-yellow-500 font-semibold py-3 text-sm text-white uppercase w-full disabled:opacity-50">
                Please Add Item to Cart
              </button>
            ) : (
              <button
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                onClick={onPlaceOrder}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
