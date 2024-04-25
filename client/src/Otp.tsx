import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Swal from 'sweetalert2';


const FormSchema = z.object({
    pin: z.string().min(4, {
        message: "Your one-time password must be 4 characters.",
    }),
});
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import axios from "axios";

export default function Otp() {
    const navigate = useNavigate()
    const location = useLocation()
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const searchParams = new URLSearchParams(location.search)
    const phone_number = searchParams.get("phone")
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });



    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
        try{
            const response = await axios.post(`${BASE_URL}/api/verify`,{otp:data.pin,phone_number:phone_number})
            if(response.status === 200){
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Successfully Verified Your Account"
                });
                localStorage.setItem('token',response.data.token)
                navigate('/')
            }
        } catch(err : any) {
            if(err.response.status === 400){
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: err.response.data.error
                });
            }
        }
    }

    return (
        <main className="grid min-h-screen place-items-center">
            <Card className="mx-auto min-w-96">
                <CardHeader>
                    <CardTitle className="text-xl">Verify account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 text-start">
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>We have send an Call to {phone_number} containing the
                                        verification code
                                    </FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={4} {...field}>
                                                <InputOTPGroup className="w-full justify-between">
                                                    <InputOTPSlot
                                                        index={0}
                                                        className="w-full rounded border"
                                                    />
                                                    <InputOTPSeparator />
                                                    <InputOTPSlot
                                                        index={1}
                                                        className="w-full rounded border"
                                                    />
                                                    <InputOTPSeparator />
                                                    <InputOTPSlot
                                                        index={2}
                                                        className="w-full rounded border"
                                                    />
                                                    <InputOTPSeparator />
                                                    <InputOTPSlot
                                                        index={3}
                                                        className="w-full rounded border"
                                                    />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                Verify
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
}