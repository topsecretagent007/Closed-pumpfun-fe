import { FC } from "react";

const ImageLoading: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 bg-transparent w-full h-full font-raleway text-center">
        <span className="loader-img"></span>
      </div>
    </>
  );
};

export default ImageLoading;

