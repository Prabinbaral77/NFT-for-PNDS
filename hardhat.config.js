require("@nomiclabs/hardhat-waffle");
// require("dotenv").config();

// const { API_URL_ALCHEMY, PRIVATE_KEY_METAMASK } = process.env;
const url =
  "https://eth-rinkeby.alchemyapi.io/v2/qvXlaPnOD9UQcMipP9sDyYlumZ4mr5sc";
const rinkeyKey =
  "208432cffc7af99cdd714114ef5883322fa9999d90d3900b171c754e391e9b68";
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: url,
      accounts: [`${rinkeyKey}`],
    },
  },
};
