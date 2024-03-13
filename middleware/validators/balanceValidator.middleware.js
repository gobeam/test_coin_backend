const { check } = require("express-validator");

const isValidEthereumAddress = (address) => {
    return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
};

exports.balanceValidationSchema = [
    check("address")
        .not()
        .isEmpty()
        .withMessage("public address is required")
        .custom((value) => {
            if (isValidEthereumAddress(value)) {
                return true;
            } else {
                throw new Error("invalid public address");
            }
        }),
    check("contractAddress")
        .not()
        .isEmpty()
        .withMessage("contract address is required")
        .custom((value) => {
            if (isValidEthereumAddress(value)) {
                return true;
            } else {
                throw new Error("invalid contract address");
            }
        }),
];
