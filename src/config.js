// import fs from 'fs';
// import path from 'path';

// const fileLensHub = fs.readFileSync(
//   path.join(__dirname, 'abis/lens-hub-contract-abi.json'),
//   'utf8'
// );
// const fileLensPeriphery = fs.readFileSync(
//   path.join(__dirname, 'abis/lens-periphery-data-provider.json'),
//   'utf8'
// );
// const fileFollowNFT = fs.readFileSync(
//   path.join(__dirname, 'abis/lens-follow-nft-contract-abi.json'),
//   'utf8'
// );


// const getParam = (name) => {
//   const param = process.env[name];
//   if (!param) {
//     return null;
//   }
//   return param;
// };

// export const argsBespokeInit = () => {
//   return process.argv.find((c) => c === '--init') !== undefined;
// };

export const PK = process.env.PK
export const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
export const LENS_API = process.env.LENS_API
export const LENS_HUB_CONTRACT = process.env.LENS_HUB_CONTRACT
export const LENS_PERIPHERY_CONTRACT = process.env.LENS_PERIPHERY_CONTRACT
export const LENS_PERIPHERY_NAME = 'LensPeriphery';

// export const PROFILE_ID = getParam('PROFILE_ID');

// export const LENS_FOLLOW_NFT_ABI = JSON.parse(fileFollowNFT);

// export const LENS_HUB_ABI = JSON.parse(fileLensHub);

// export const LENS_PERIPHERY_ABI = JSON.parse(fileLensPeriphery);
