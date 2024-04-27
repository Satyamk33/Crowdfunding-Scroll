import React from "react";

const Footer = () => {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = ["postman_blockchain@pilani.bits-pilani.ac.in", "info@pilani.bits-pilani.ac.in", "Contact Us"];
  const UsefullLinks = ["Home", "About Us", "Postman BlkChain"];
  return (
    <footer1 class="text-center text-white, backgroundMain lg:text-left">
      <div class="mx-6 py-10 text-center md:text-left">
        <div class="grid-1, grid gap-8 md:grid-cols-2 lg:grid-cols-4">
         <div class="">
          <h6 class="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
            BITSPILANI POSTMAN LAB CrowdFund
            </h6>
            <p>
            Here comes the BlockChain Crowdfunding dAapp by BITS Pilani Postman Lab
            </p>
         </div>
         <div class="">
          <h6 class="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
            Products
          </h6>
          {productList.map((e1,i)=> (
            <p class="mb-4" key={i+1}>
              <a href="#!">{e1}</a>
            </p>
          ))}
         </div>
         <div class="">
          <h6 class="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
            Useful Links
          </h6>
          {UsefullLinks.map((e1,i)=> (
            <p class="mb-4" key={i+1}>
              <a href="#!">{e1}</a>
            </p>
          ))}
         </div>
         <div>
          <h6 class="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
           Contact
          </h6>
          {contactList.map((e1,i)=> (
            <p class="mb-4" key={i+1}>
              <a href="#!">{e1}</a>
            </p>
          ))}
         </div>
        </div>
      </div>
      <div class="backgroundWhite p-6 text-center">
          <span> 2024 Copyright: </span>
          <a class="font-semibold" href="https://tw-elements.com/">
            BITSPILANI POSTMAN LAB
          </a>
      </div>
      </footer1>

        )
};

export default Footer;