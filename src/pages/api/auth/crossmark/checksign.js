const jwt = require("jsonwebtoken");
const rippleKP = require("ripple-keypairs");

export default async function handler(req, res) {
    try {
        const authHeader = req.headers.authorization;
        const { signature, nonce } = req.query;
        res.setHeader('Access-Control-Allow-Origin','*');
        const token = authHeader ? authHeader.split(" ")[1] : nonce;
        if (token == null) return res.status(401).json({ error: "Unauthorized" });
        let { pubkey: public_key, address } = req.body || req.query;

        const isVerified = rippleKP.verify(
            token,
            signature,
            public_key
        )
        if (isVerified) {
            const token = jwt.sign({ xrpAddress: address }, process.env.ENC_KEY);
            res.setHeader('Access-Control-Allow-Origin','*');
            res.status(200).json({ token: token, address: address });
        } else {
            res.status(400).json({ error: "Signature not verified" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message, line: error.stack });
    }
}
