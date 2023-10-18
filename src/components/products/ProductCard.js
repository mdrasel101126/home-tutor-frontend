import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card card-compact shadow-xl">
      <figure>
        <Image
          src={product?.image}
          layout="responsive"
          width={500}
          height={270}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product?.productName}</h2>
        <p>Category:{product?.category}</p>
        <p>Price:{product?.price}</p>
        <p>Status:{product?.status}</p>
        <p>Rating:{product?.avarageRating}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">
            <Link href={`/product-details/${product?._id}`}>Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
