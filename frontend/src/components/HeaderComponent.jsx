import React from "react";

const HeaderComponent = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-5/6 ml-auto">
          <input
            type="text"
            placeholder="Search product, supplier, order"
            className="w-[320px]"
          />
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
