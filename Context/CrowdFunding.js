import React, {useState, useEffect} from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT
import {CrowdFundingABI, CrowdFundingAddress} from "./contants"

// --- FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => 
    new ethers.Contract(CrowdFundingAddress,CrowdFundingABI,signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({children}) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState ("");

    const createCampaign = async (campaign) => {
        const {title, description, amount, deadline} = campaign;
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log(currentAccount);
        try {
            const transaction = await contract.createCampaign(
                title, // title
                description, // description
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime(), // deadline
            );
            
            await transaction.wait();

            console.log("contract call success", transaction);
        } catch (error) {
            console.log("contract call failure", error)
        }
    };

    const getCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();

        const parsedCampaigns = campaigns.map((campaign,i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));

        return parsedCampaigns;
    };

    const getUserCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const currentUser = accounts[0];

        const filteredCampaigns = allCampaigns.filter(
            (campaign) =>
                campaign.owner === "0xf39Fd6e51aad88F6F4ce68B88272979cffFb92266"
        );

        const userData = filteredCampaigns.map((campaign,i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));

        return userData;
    };

    const donate = async (pId, amount) => {
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        });

        await campaignData.wait();
        location.reload();

        return campaignData;
    };

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i=0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations [0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }

        return parsedDonations;
    };

    const addMilestone = async (campaignId, milestone) => {
        const { description, targetAmount, deadline } = milestone;
        const web3Modal = new Web3Modal();
        try {
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.addMilestone(
                campaignId,
                description,
                ethers.utils.parseEther(targetAmount),
                new Date(deadline).getTime()
            );

            await transaction.wait();

            console.log("milestone added successfully", transaction);
        } catch (error) {
            console.log("failed to add milestone", error);
        }
    };
    // --- CHECK IS WALLET IS CONNECTED
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError (true), setError("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
        
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Account Found");
            }
        } catch (error) {
            console.log("Something wrong while connecting to Wallet");
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    // --- CONNECT WALLET FUNCTION
    const  connectWallet= async () => {
        try {
            if (!window.ethereum) return console.log("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        }catch (eroor){
            console.log("Error while connecting to Wallet");
        }
    };

    const IPFS = require('ipfs-core');

    async function uploadFileToIPFS(file) {
        const ipfs = await IPFS.create();

        try {
            // Read the file content
            const fileContent = await readFileContent(file);

            // Add the file to IPFS
            const { cid } = await ipfs.add(fileContent);

            // Return the CID (Content Identifier) of the uploaded file
            return cid.toString();
        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
            throw error;
        } finally {
            // Close the IPFS instance to release resources
            await ipfs.stop();
        }
    }

    async function readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = error => {
                reject(error);
            };

            // Read the file as ArrayBuffer (binary data)
            reader.readAsArrayBuffer(file);
        });
    }

    // Example usage:
    // const fileInput = document.getElementById('fileInput'); // Assuming you have an input element with id 'fileInput'
    // fileInput.addEventListener('change', async (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         try {
    //             const ipfsHash = await uploadFileToIPFS(file);
    //             console.log('File uploaded to IPFS. IPFS Hash:', ipfsHash);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     }
    // });


    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
                addMilestone,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};
