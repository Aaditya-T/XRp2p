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

    //get all initiated trades where counterAddress is xrpAddress
    const records = await pb.collection("ongoingTrades").getList(1, 1000, {
      filter: `counterAddress = "${xrpAddress}"`,
      sort: "-created",
      expand: "trade",
    });

    if (!records) throw new Error("Trade not initiated");
    return res.status(200).json({ records });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
