const jwt = require("jsonwebtoken");
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.pb_url);
const admin = await pb.admins.authWithPassword(
  process.env.pb_id,
  process.env.pb_pass
);

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") throw new Error("Only GET requests allowed");

    // Add the trade to the database
    const records = await pb.collection('trades').getFullList({
        sort: '-created',
    });

    if (!records) throw new Error("Trade not added");

    return res.status(200).json({ records });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
