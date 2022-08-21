import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productsSlice";

function Items() {
  const dispatch = useDispatch();

  const { products, productsIsLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div
      className={` min-h-full flex-items-center jerstify-center  ${productsIsLoading ? "animate-pulse bg-white-400" : ""
        }`}
    >
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((item) => (
          <div className="bg-transparent p-3 rounded" key={item._id}>
            <Item key={item._id} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
