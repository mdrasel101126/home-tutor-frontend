import Image from "next/image";
import userPic from "../../assets/user-pic.png";

const ProductDetails = ({ product }) => {
  return (
    <div>
      <div className="card card-compact shadow-xl">
        <figure>
          <Image src={product?.image} width={500} height={270} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-primary ml-4">
            {product?.productName}
          </h2>
          <div className="flex flex-row flex-wrap">
            <div className="w-52">
              <p className="bg-green-200 p-2 text-center rounded-md font-semibold text-primary m-4">
                Category:{product?.category}
              </p>
            </div>
            <div className="w-52">
              <p className="bg-green-200 p-2 text-center rounded-md font-semibold text-primary m-4">
                Price:{product?.price}
              </p>
            </div>
            <div className="w-52">
              <p className="bg-green-200 p-2 text-center rounded-md font-semibold text-primary m-4 ">
                Status:{product?.status}
              </p>
            </div>
            <div className="w-52">
              <p className="bg-green-200 p-2 text-center rounded-md font-semibold text-primary m-4 ">
                Avarage Rating:{product?.avarageRating}
              </p>
            </div>
            <div className="w-52">
              <p className="bg-green-200 p-2 text-center rounded-md font-semibold text-primary m-4">
                Individual Rating:{product?.individualRatin}
              </p>
            </div>
          </div>
          <div className="m-4">
            <h3 className="text-primary text-2xl font-semibold">
              Key Features
            </h3>
            <p className="text-primary font-semibold">
              Brand:{product?.keyFeatures?.brand}
            </p>
            <p className="text-primary font-semibold">
              Model:{product?.keyFeatures?.model}
            </p>
          </div>
          <h3 className="text-lg font-semibold text-primary ml-4">
            Description:
          </h3>
          <p className="ml-4 text-justify font-semibold">
            {product?.description}
          </p>
        </div>
      </div>
      <div className="m-8">
        <p className="text-lg font-semibold">Reviews:</p>
        {product?.reviews?.map((review) => (
          <div
            key={review._id}
            className="my-4 border rounded-lg shadow-md p-4"
          >
            <div className="flex flex-row items-center">
              <Image
                width={40}
                height={40}
                alt="user pic"
                className="rounded-full"
                src={userPic}
              />
              <p className="ml-1 font-semibold">{review.name}</p>
            </div>
            <p className="text-slate-700 ml-4">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
