const jwt = require("jsonwebtoken");
const rippleKP = require("ripple-keypairs");

export default async function handler(req, res) {
    try {
        const authHeader = req.headers.authorization;
        const { signature, nonce } = req.query;
        console.log(signature);
        console.log(nonce);
        const token = authHeader ? authHeader.split(" ")[1] : nonce;
        res.setHeader('Access-Control-Allow-Origin','*');
        if (token == null) return res.status(401).json({ error: "Unauthorized" });
        const {public_key, address} = jwt.verify(token, process.env.ENC_KEY);
        const tokenHex = (Buffer.from(token, "utf8")).toString("hex");
        const isVerified = rippleKP.verify(
            tokenHex,
            signature,
            public_key
        )
        if (isVerified) {
            const token = jwt.sign({ xrpAddress: address }, process.env.ENC_KEY);

            res.status(200).json({ token: token, address: address });
        } else {
            res.status(400).json({ error: "Signature not verified" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message, line: error.stack });
    }
}
