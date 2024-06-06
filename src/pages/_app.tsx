import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  const [xrpAddress, setXrpAddress] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [trades, setTrades] = useState<any[]>([]);
  const [ongoingTrades, setOngoingTrades] = useState<any[]>([]);

  const updateXrpAddress = (address: string) => {
    setXrpAddress(address);
  }

  useEffect(() => {
    if (cookies.jwt !== undefined && cookies.jwt !== null) {
      const url = "/api/auth";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: cookies.jwt }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.hasOwnProperty("xrpAddress")) {
            setXrpAddress(data.xrpAddress);
          }
        });
    }

    const url = "/api/trade/getAll";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrades(data.records);
      });
 
    const url2 = "/api/trade/getInit";
    fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: cookies.jwt }),
    })
      .then((response) => response.json())
      .then((data) => {
        setOngoingTrades(data?.records?.items);
      });

  }, []);


  return <Component {...pageProps} xrpAddress={xrpAddress} updateXrpAddress={updateXrpAddress} trades={trades} ongoingTrades={ongoingTrades} />;
}
