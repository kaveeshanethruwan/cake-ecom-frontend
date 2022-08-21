import React from 'react'


function CheckoutItem(props) {
    return (
        <div className="block">
            <div className="flex pt-2.5 pb-3.5 px-0">
                <div className="relative flex w-32 h-32">
                    <img src={props.catItem.img_url} alt="" />
                </div>
                <div className="flex-1 pl-4">
                    <div className="max-w-md text-sm mb-1.5">
                        {props.catItem.item_name}
                    </div>
                    <div className="mt-2">
                        <div className="flex items-center">
                            <span className="relative text-base font-black pr-2">Rs. {props.catItem.amount}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center h-32">
                    <div className="text-right">
                        <div className="inline-block">
                            <span className="w-20">{props.catItem.qty}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutItem
