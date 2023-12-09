import React from "react";
import Footer from "../../Components/HomeComponents/Footer/Footer";
import Navbar from "../../Components/HomeComponents/Navbar/Navbar";

const Refundpolicy = () => {

  return (
    <div className="">
      <Navbar />
      	<div className="sn_page_pad">
      		<div className="container">
      		<h1>Refund & Cancellation Policy</h1>
          <h5>Updated: 15 January 2020</h5>
      		<p>The Company (“BTRL Exchange” i.e. “Gaffer IT Solution Pvt. Ltd.”), under no circumstance, entertains the refund or cancellation of a successfully fulfilled order. Once a user has placed a buy order, which has been fully or partially matched, the amount in the chosen currency is immediately transferred to the sellers’ account and these transactions cannot be reversed. However, once a user deposits money into his BTRL Exchange account, he/she always has the option to withdraw this money in full or in part in accordance with the withdrawal limits.</p>
      		<p>BTRL Exchange shall be entitled to retain/deduct the amounts due to actions from the user and transfer or refund the balance lying in the User Account, except when it is unable to do so in compliance with applicable laws. Purchase of any cryptocurrency can be done in currencies stated on our platform and the respective amount shall be deducted from the user’s wallet. Sell of any crypto assets can be done as per the currencies stated on the platform or other pairs and the respective amount will be credited to user’s wallet.</p><br/>
      		<p><b>A user will not be entitled to a refund or cancellation in the following circumstances:</b></p>
      		<p>1. The user fails to provide BTRL Exchange with any information or documents when requested in accordance with the terms of service of any Online Platform,</p><p>
2. BTRL Exchange suspects that the user has, or is, engaged in, or has in any way been involved in any fraudulent or illegal activity, any money laundering, any terrorist financing, or breach of any relevant laws in any jurisdiction.</p>
      		</div>
      	</div>
      <Footer />
    </div>
  );
};

export default Refundpolicy;
