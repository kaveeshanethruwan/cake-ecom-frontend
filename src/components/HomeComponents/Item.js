import React from "react";
import { Link } from "react-router-dom";

function Item(props) {
  let discountPrice = props.item.prices.discount / 100;
  discountPrice = discountPrice * props.item.prices.price;

  return (
    <div className="card bordered h-full shadow-md">
      <figure className="h-66" style={{ height: "250px" }}>
        <img src={props.item.imgUrl} className="h-full" />
      </figure>

      {/* card-body */}
      <div className="mt-5 pl-5">
        <h2 className="card-title">
          {props.item.name}

          {props.item.isActive ? (
            <div className="badge mx-2 badge-error">NEW</div>
          ) : null}
        </h2>

        <p className="font-semibold">{props.item.weight}</p>

        <div style={{ height: "65px" }}>
          <div className="mt-3">
            {!props.item.prices.discount == 0 ? (
              <p className=" font-medium text-red-500">
                <div className="flex font-medium ">
                  <del className="text-purple-600">
                    LKR{props.item.prices.price}
                  </del>
                  <ul className="ml-3 text-red-600">
                    {props.item.prices.discount}% OFF
                  </ul>
                </div>
                <p className="mt-1 text-xl">
                  LKR {props.item.prices.price - discountPrice}
                </p>
              </p>
            ) : (
              <p className="font-medium text-black-500 text-xl">
                LKR {props.item.prices.price}
              </p>
            )}
          </div>
        </div>

        {/* card-actions  */}
        <div className="flex justify-end  mb-5 pr-5">
          <div className="flex">
            {props.item.qty == 0 ? (
              <button className="btn btn-secondary" disabled="disabled">
                Not Available
              </button>
            ) : (
              <Link to={`/item-view/${props.item._id}`}>
                <button className="btn btn-warning">
                  <span className="mr-1">View</span>
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
