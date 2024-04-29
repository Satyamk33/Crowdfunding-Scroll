
# Decentralized Funding: Building and Deploying a Blockchain Crowdfunding DApp

Building and Deploying a Blockchain Supply Chain Management DApp

Revolutionize the way projects and ideas are funded with our blockchain crowdfunding DApp. This innovative platform leverages the power of blockchain technology to create a decentralized, transparent, and secure environment for fundraising.

Our crowdfunding DApp enables project creators to raise capital directly from a global pool of investors without the need for intermediaries. By utilizing smart contracts, the DApp automates the fundraising process, ensuring that funds are released to project creators only when predefined milestones are met, thereby increasing accountability and reducing the risk of fraud

# Future Scope<br>
Connecting with IPFS: We can connect our contract with IPFS, so that the creators can deploy images and progress of their BUILDS without storing this data on Blockchain<br> 
Report Functionality:In the future, we plan to implement a report functionality where donors can report instances where project creators fail to fulfill their promises. Upon verification, the project creator's ID will be banned from creating another campaign.<br>
Business Model <br>
Fees Charging for Uploading:In the future, we may introduce a fee charged for uploading projects onto the platform.<br>
Security Deposit: A 5% security deposit may be required in the future when submitting a project. This deposit would be refunded upon successful completion of the project.<br>
Multichain Functionality:Implement the ability for users from different blockchain networks to donate to projects.<br>
Active Donators Award System, Project Advertisement (Featured Projects), Tiers/Multiple Donation Amount Option, KYC etc.<br><br>

# To get started with our DApp(Local Host Using Hardhat)
 1)Install all dependencies by npm install<br>
 2)In the terminal run command npx hardhat node<br>
 3)In the split terminal run npx hardhat run --network localhost scripts/deploy.js<br>
 4)This will generate two folders artifacts and cache. Delete the CrowdFunding.json file from Context folder. Go to artifacts/contracts, copy the new CrowdFunding.json from there and paste in the Context Folder.<br>
 5) Now in the terminal run npm run dev.<br><br>

 Deployed on Scroll Seplioa- Contract: 0x1a4cdace068fc76c0d10d2a84892fd9e117d42b2<br>
 Verified: https://sepolia.scrollscan.com/verifyContract-solc?a=0x1a4cdace068fc76c0d10d2a84892fd9e117d42b2&c=v0.8.25%2Bcommit.b61c2a91&lictype=2<br><br>

Thank You for Using our CrowdFunding Dapp.


