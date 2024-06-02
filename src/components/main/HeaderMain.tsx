import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Link from "next/link";
import Image from "next/image";
import { useCookies } from "react-cookie";

export default function HeaderMain({ address }: { address: string }) {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  return (
    <header className="flex items-center justify-between p-2">
      <Link href="/" passHref>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={70}
          height={20}
          className="cursor-pointer rounded-full"
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {
            address !== "" ? (
              <>
                <NavigationMenuItem>
                  <Link href="/create" passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Create
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="bg-red-500 rounded-md">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => {
                    removeCookie("jwt");
                    window.location.href = "/";
                  }}
                  title="Disconnect"
                  >
                    {address.slice(0, 4) + "..."}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <Link href="/connect" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {/* {address === "" ? "Connect" : address.slice(0, 4) + "..."} */}
                    Connect
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          }


        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
