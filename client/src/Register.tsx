import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
const API_KEY = import.meta.env.VITE_MAP_API;


const formSchema = z.object({
    phone_number: z
        .string()
        .min(10, {
            message: "Phone number must be 10 numbers long",
        })
        .max(10, {
            message: "Phone number can't be morethan 10 numbers long",
        })
        .refine((value) => !isNaN(Number(value)), {
            message: "Phone number must be a valid number.",
        }),
    username: z.string().min(3, "Username invalid"),
    location: z.any()
});

export default function register() {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone_number: "",
        },
        mode: "onTouched",
    });



    

    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    const onSubmit = async  (values: z.infer<typeof formSchema>) => {
        const saniteriseinput = {...values, location: values.location.label}
        try{
            const response = await axios.post(`${BASE_URL}/api/user`,saniteriseinput)
            if(response.status === 201){
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
                    title: "Successfully Created Account"
                });
                navigate('/login')
            }
        } catch(err : any){
            
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
                    title: err.response.data.error['phone_number']
                });
            }
        }
    }

    return (
        <main className="grid min-h-screen place-items-center">
            <Card className="mx-auto min-w-96">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 text-left">
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="phone"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="username"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <GooglePlacesAutocomplete
                                                apiKey={API_KEY}
                                                selectProps={{
                                                    onChange:field.onChange,
                                                    placeholder:
                                                        "Enter Your Location",
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="#" className="underline">
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}