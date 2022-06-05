require("dotenv").config();
const API_URL = process.env.API_URL_ALCHEMY;
const publicKey = process.env.METAMASK_PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY_METAMASK;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contracts = require("../artifacts/contracts/MyNFT.sol/MyNFT.json").abi;

const contractAdddress = process.env.CONTRACT_ADDRESS;
const nftContract = new web3.eth.Contract(contracts, contractAdddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(publicKey, "latest");
  const tx = {
    from: publicKey,
    to: contractAdddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(publicKey, tokenURI).encodeABI(),
  };
  const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmP9sbYeG3MGfM2VqNpuSH7rFSvRdH81NBUboA9pMKZDVx"
);
