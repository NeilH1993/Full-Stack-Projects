import React, { useRef, useState } from "react";

export default function Currency() {
  const [amount, setAmount] = useState("");
  const [selectCurrency, setSelectCurrency] = useState("ILS-EUR");
  const [showConverted, setShowConverted] = useState("");
  
  const lastCurrency = useRef()

  const exchangeRates = {
    "ILS-EUR": 0.26, 
    "EUR-ILS": 3.85, 
    "ILS-USD": 0.27, 
    "USD-ILS": 3.7, 
    "USD-EUR": 0.92, 
    "EUR-USD": 1.09, 
  };


  console.log(selectCurrency);

  function send() {
    const regexnum = /[0-9.]+$/;
    if (!regexnum.test(amount)) {
      return alert("You can add numbers only");
    }
    const rate = exchangeRates[selectCurrency];

    const result = parseFloat((amount * rate).toFixed(2));
    setShowConverted(result);
    lastCurrency.current = selectCurrency
    console.log(result, lastCurrency.current);
  }

  return (
    <>
    <div className="flex flex-col items-center gap-5 p-5">
      <input className="w-full p-2 border rounded" type="text" placeholder="Type sum" onChange={(e) => setAmount(e.target.value)} />
      <select className="w-full p-2 border rounded" onChange={(e) => setSelectCurrency(e.target.value)}>
        <option value="ILS-EUR">ILS to EUR</option>
        <option value="EUR-ILS">EUR to ILS</option>
        <option value="ILS-USD">ILS to USD</option>
        <option value="USD-ILS">USD to ILS</option>
        <option value="USD-EUR">USD to EUR</option>
        <option value="EUR-USD">EUR to USD</option>
      </select>
      <button className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-700" onClick={send}>Convert</button>
      {showConverted && (
        <p>
          {lastCurrency.current === "ILS-EUR" || lastCurrency.current === "USD-EUR"
            ? "€"
            : lastCurrency.current === "EUR-ILS" || lastCurrency.current === "USD-ILS"
            ? "₪"
            : "$"}
          {showConverted}
        </p>
      )}
    </div>
    </>
  );
}
