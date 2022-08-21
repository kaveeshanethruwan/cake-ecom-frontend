import React from "react";

function ProtfolioItem(props) {
   return (
      <div className="row-auto	pb-24 pt-5">
         <div className=" bg-white  mx-auto shadow-lg rounded-lg hover:shadow-xl transition duration-200 max-w-sm">
            <img className="rounded-t-lg" src={props.imageUrl} alt="" />
            <div className="py-4 px-8">
               <h1 className="hover:cursor-pointer mt-2 text-gray-900 font-bold text-2xl tracking-tight">
                  {props.postName}
               </h1>
            </div>
         </div>
      </div>
   );
}

export default ProtfolioItem;
