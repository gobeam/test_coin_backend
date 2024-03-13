const Web3API = require("web3");
const abi = require("../../contracts/abi/TestTokenABI.json");

const getERC20Balance = async (req, res) => {
    const { address, contractAddress } = req.body;
    let web3HttpProvider = process.env.ALCHEMY_WEB3_HTTP_PROVIDER;
    if (!web3HttpProvider) {
        return res.status(500).json({
            success: false,
            msg: "Web3 provider not found",
        });
    }
    const web3 = new Web3API(
        new Web3API.providers.HttpProvider(
            web3HttpProvider
        )
    );
    const contract = new web3.eth.Contract(abi, contractAddress);
    const balance = await contract.methods.balanceOf(address).call();
    return res.status(200).json({
        success: true,
        msg: "Balance fetched successfully",
        data: {
            balance
        },
    });
};

module.exports = {
    getERC20Balance,
};
