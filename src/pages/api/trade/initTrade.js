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
    const { tradeId } = req.body;

    // updated: initiated = true on trades collection
    const record = await pb.collection('trades').update(tradeId, {
        initiated: true
    });
    //add to ongoing trades
    const ongoingTrade = await pb.collection('ongoingTrades').create({
        trade: tradeId,
        counterAddress: xrpAddress
    });

    if (!record) throw new Error("Trade not initiated");

    return res.status(200).json({ record, message: "Trade initiated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
