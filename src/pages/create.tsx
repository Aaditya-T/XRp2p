"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useCookies } from "react-cookie"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import HeaderMain from "@/components/main/HeaderMain"

const formSchema = z.object({
    currency: z.string().min(3, {
        message: "Currency must be at least 3 characters.",
    }),
    type: z.enum(["BUY", "SELL"]),
    amount: z.number().min(0.01, {
        message: "Amount must be at least 0.01.",
    }),
})

export default function ProfileForm({ xrpAddress }: { xrpAddress: string }) {
    const { toast } = useToast()
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"])

    useEffect(() => {
        if (!cookies.jwt) {
            window.location.href = "/connect"
        }
    }, [cookies])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currency: "XRP",
            type: "BUY",
            amount: 0,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const url = "/api/trade/add"
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...values,
                token: cookies.jwt,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.hasOwnProperty("message")) {
                    console.log(data.message)
                    toast({
                        title: "Trade Created",
                        description: data.message,
                    })
                    form.reset()
                }
            })
    }

    return (
        <><HeaderMain address={xrpAddress} /><div className="space-y-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mt-2">Create a trade</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <FormControl>
                                    <Input placeholder="XRP" {...field} disabled />
                                </FormControl>
                                <FormDescription>
                                    Enter name of the currency you want to trade. (Multiple currencies coming soon!)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mr-2">Type</FormLabel>
                                <FormControl>
                                    <select {...field} className="rounded-lg border border-gray-300">
                                        <option value="BUY" defaultChecked>Buy</option>
                                        <option value="SELL">Sell</option>
                                    </select>
                                </FormControl>
                                <FormDescription>
                                    Select the type of trade you want to create.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} onChange={(e) => {
                                        field.onChange(parseFloat(e.target.value))
                                    }} />
                                </FormControl>
                                <FormDescription>
                                    Enter the amount of currency you want to trade.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>

            <Toaster />
        </div></>
    )
}
