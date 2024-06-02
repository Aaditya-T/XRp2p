const jwt = require("jsonwebtoken");
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.pb_url);
const admin = await pb.admins.authWithPassword(
  process.env.pb_id,
  process.env.pb_pass
);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") throw new Error("Only POST requests allowed");
    const token = req.body.token;
    const { xrpAddress } = jwt.verify(token, process.env.ENC_KEY);
    const {currency, type, amount } = req.body;

    // Add the trade to the database
    const record = await pb.collection('trades').create({
        initiator: xrpAddress,
        currency,   
        type,
        amount,        
    });

    if (!record) throw new Error("Trade not added");

    return res.status(200).json({ record, message: type + " Trade of " + amount + " " + currency + " added successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
