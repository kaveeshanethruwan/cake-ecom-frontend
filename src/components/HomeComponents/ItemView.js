import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setCartTotal } from "../../redux/cartSlice";
import {
  getProduct,
  addPrice,
  substractPrice,
  setProductsStatus,
} from "../../redux/productsSlice";

function ItemView() {
  // VARIABLES
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const { product, productIsLoading, productsStatus } = useSelector(
    (state) => state.products
  );
  const [qty, setQty] = useState(1);
  const { shoppingCart, orderTotal } = useSelector((state) => state.cart);
  const [isExceed, setIsExceed] = useState(false);

  useEffect(() => {
    dispatch(getProduct(itemId));
  }, []);

  const addToCart = () => {
    var cloneshoppingcart = JSON.parse(JSON.stringify(shoppingCart));
    var cloneProductStatus = JSON.parse(JSON.stringify(productsStatus));

    const newProduct = {
      item_id: product._id,
      item_name: product.name,
      qty: qty,
      price: parseInt(
        product.prices.price -
          product.prices.price * (product.prices.discount / 100)
      ),
      amount: product.discountedPrice,
      img_url: product.imgUrl,
    };
    const newProductStatus = {
      item_id: product._id,
      isExceed: false,
    };
    var itemPrice = newProduct.price * qty;
    var cloneTotal = parseFloat(orderTotal);

    var item = cloneshoppingcart.find(
      (item) => item.item_id === newProduct.item_id
    );

    if (item) {
      item.qty = item.qty + newProduct.qty;
      item.amount = item.amount + newProduct.amount;

      if (Array.isArray(cloneProductStatus) && Array.length) {
        var eItem = cloneProductStatus.find(
          (eItem) => eItem.item_id === product._id
        );

        if (eItem) {
          if (item.qty > product.qty) {
            eItem.isExceed = true;
            console.log("loop 1");
          } else {
            eItem.isExceed = false;
            console.log("loop 1.2");
          }
        }
      }
    } else {
      if (newProduct.qty > product.qty) {
        newProductStatus.isExceed = true;
        cloneProductStatus.push(newProductStatus);
        console.log("loop 2");
      } else {
        cloneshoppingcart.push(newProduct);
        var eeItem = cloneProductStatus.find(
          (eeItem) => eeItem.item_id === newProduct.item_id
        );

        if (eeItem) {
          cloneProductStatus.pop(eeItem);
        }

        cloneProductStatus.push(newProductStatus);
        console.log("loop 3");
      }
    }

    if (Array.isArray(cloneProductStatus) && Array.length) {
      var fItem = cloneProductStatus.find(
        (fItem) => fItem.item_id === product._id
      );

      if (fItem) {
        if (!fItem.isExceed) {
          dispatch(setCart(cloneshoppingcart));
          dispatch(setCartTotal(cloneTotal + itemPrice));
          console.log("main");
          setIsExceed(false);
        } else {
          setIsExceed(true);
        }
      }
    }
    dispatch(setProductsStatus(cloneProductStatus));
  };

  // INCREASE QUANTITY
  const onPlus = () => {
    setQty(qty + 1);
    const amount =
      (product && product.prices ? product.prices.price : null) -
      ((product && product.prices ? product.prices.discount : null) / 100) *
        (product && product.prices ? product.prices.price : null);
    const sum = amount + product.discountedPrice;
    dispatch(addPrice(sum));
  };

  // DECREASE QUANTITY
  const onSubstract = () => {
    if (qty == 1) {
    } else {
      setQty(qty - 1);
      const amount =
        (product && product.prices ? product.prices.price : null) -
        ((product && product.prices ? product.prices.discount : null) / 100) *
          (product && product.prices ? product.prices.price : null);
      const sub = product.discountedPrice - amount;
      dispatch(substractPrice(sub));
    }
  };

  return (
    <div
      className={`container mx-auto  ${
        productIsLoading ? "animate-pulse bg-white-400" : ""
      }`}
    >
      <div className="card lg:card-side bordered mt-8">
        <figure
          className="w-60 bg-red-300"
          style={{ height: "500px", maxWidth: "800px" }}
        >
          <img className="h-full" src={product.imgUrl} />
        </figure>

        <div className="card-body  flex flex-col justify-center pl-5">
          <div className="pl-10">
            <h2 className="card-title">
              {product.name}
              {product.isActive ? (
                <div className="badge mx-2 badge-secondary">NEW</div>
              ) : null}
            </h2>
            <h3 className="font-semibold">{product.category}</h3>
            <p className="mt-4">{product.description}</p>

            <div className="flex flex-row mt-3">
              <h2 className="card-title">LKR </h2>
              <h2 className="card-title ml-2">{product.discountedPrice}</h2>
            </div>

            <div className="btn-group mt-3">
              <button className="btn btn-outline btn-primary" onClick={onPlus}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <div className="btn btn-outline btn-primary">{qty}</div>
              <button
                className="btn btn-outline btn-primary"
                onClick={onSubstract}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 12H6"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-7">
              <button className="btn btn-wide " onClick={addToCart}>
                ADD TO CART
              </button>
              {!isExceed ? null : (
                <div className="alert alert-error mt-2">
                  <div className="flex-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 mx-2 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      ></path>
                    </svg>
                    <label>Only {product.qty} available!</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemView;
