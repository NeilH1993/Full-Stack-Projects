import React from "react";
import Calculator from "./Calculator";
import Currency from "./Currency";

export default function HomePage() {
  return (
    <>
    <div className="flex-col items-center h-screen gap-6">
      <h1 className="text-3xl font-bold text-center">Calculator & Currency</h1>
      <div className="flex justify-around mt-32">
      <Calculator />

      <Currency />
      </div>


    </div>

    </>
  );
}
