import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { isInstalled, getPublicKey, signMessage } from "@gemwallet/api";
import sdk from "@crossmarkio/sdk";
import { useCookies } from "react-cookie";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderMain from "@/components/main/HeaderMain";

const inter = Inter({ subsets: ["latin"] });

const exampleTrades = [
  {
    id: "TRADE001",
    method: "XRP",
    amount: 100,
    initiator: "rtest...",
    type: "SELL",
  },
  {
    id: "TRADE002",
    method: "XRP",
    amount: 400,
    initiator: "ralice...",
    type: "BUY",
  }
]

export default function Home({ xrpAddress, trades }: { xrpAddress: string, trades: any[] }) {

  return (
    <>
      <HeaderMain address={xrpAddress} />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-14 ${inter.className}`}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center">
            Welcome to XRp2p!
          </h1>
          <p className="text-center mt-4 text-lg">
            A peer-to-peer exchange for XRPL! Utilize the power of the XRP Ledger
            <span className="text-blue-500"> ESCROWS </span>
            to trade xrp/tokens within the community.
          </p>
          <div className="flex mt-8">
            <Table>
              <TableCaption>Current open trades</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Amount</TableHead> 
                  <TableHead>Initiater</TableHead> 
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades?.map((trade, index) => (
                  <TableRow key={index} className={`${trade.initiator === xrpAddress ? "bg-green-100" : ""}`}>
                    <TableCell>{trade.id}</TableCell>
                    <TableCell>{trade.currency}</TableCell>
                    <TableCell>{trade.amount}</TableCell>
                    <TableCell>{trade.initiator}</TableCell>
                    <TableCell className="text-right">{trade.type}</TableCell>
                    <TableCell> 
                      <Link href={`/trade/${trade.id}`}>
                        <Button className="w-24 h-8 bg-blue-500 hover:bg-blue-600">
                          Initiate trade
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
