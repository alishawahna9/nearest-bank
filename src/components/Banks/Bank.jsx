import React, { useEffect, useState } from "react";
import BankCard from "./BankCard";

// 🏦 Bank component – loads the list of banks and displays each as a separate card
function Bank() {
  const [banks, setBanks] = useState([]);

  // useEffect runs once when the component mounts
  useEffect(() => {
    fetch("/banks.json") 
      .then((res) => res.json()) 
      .then((data) => setBanks(data)) 
      .catch((err) => console.error("Error loading banks:", err)); 
  }, []); 

  
  return (
    <div>
      {/* If the data is still loading, show a message */}
      {banks.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        // Otherwise, map through the list and render a BankCard for each item
        banks.map((bank, index) => (
          <BankCard key={index} bank={bank} /> 
        ))
      )}
    </div>
  );
}

export default Bank;



