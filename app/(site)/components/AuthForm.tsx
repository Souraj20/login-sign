"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import axios from 'axios';
import { toast } from 'react-hot-toast';

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === "REGISTER") {
            // axios register
            axios.post('/api/register', data)
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
        }

        if (variant === "LOGIN") {
            // NextAuth SignIn
        }
    };

    const socialAction = (actions: string) => {
        setIsLoading(true);

        // NextAuth Social Sign In
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                className="
                bg-white
                px-4
                py-8
                shadow
                sm:rounded-lg
                sm:px-10
            "
            >
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && (
                        <Input
                            id="name"
                            label="نام"
                            register={register}
                            errors={errors}
                        />
                    )}
                    <Input
                        id="email"
                        label="ایمیل"
                        type="email"
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id="password"
                        label="رمز عبور"
                        type="password"
                        register={register}
                        errors={errors}
                    />
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit">
                            {variant === "LOGIN" ? "ورود" : "ثبت نام"}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                            absolute 
                            inset-0 
                            flex 
                            items-center
                        "
                        >
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                ادامه با
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction("github")}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction("google")}
                        />
                    </div>
                </div>

                <div
                    className="
                    flex 
                    gap-2 
                    justify-center 
                    text-sm 
                    mt-6 
                    px-2 
                    text-gray-500
                "
                >
                    <div>
                        {variant === "LOGIN"
                            ? "آیا تازه وارد هستید؟"
                            : "در حال حاضر اکانت دارم"}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === "LOGIN" ? "ایجاد اکانت جدید" : "ورود"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
