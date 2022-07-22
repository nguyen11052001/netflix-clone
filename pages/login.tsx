import useAuth from '@/hooks/useAuth';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface LoginInput {
    email: string;
    password: string;
}

export default function Login() {
    const [login, setLogin] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>();
    const { signIn, signUp, loading, logout, error } = useAuth();

    const onSubmit: SubmitHandler<LoginInput> = async ({ email, password }) => {
        if (login) {
            await signIn(email, password);
        } else {
            await signUp(email, password);
        }
    };

    return (
        <div className='relative flex flex-col h-screen bg-black md:items-center md:justify-center md:bg-transparent'>
            <Head>
                <title>Netflix</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            {/* background  */}
            <Image
                src='https://rb.gy/p2hphi'
                layout='fill'
                className='-z-10 !hidden opacity-60 sm:!inline'
                objectFit='cover'
            />

            {/* logo */}
            <img
                src='https://rb.gy/ulxxee'
                width={150}
                height={150}
                className='absolute left-4 top-4 cursor-pointer  object-contain md:left-10 md:top-6'
            />

            {/* form login and register */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='relative mt-24 py-10 px-6 space-y-8 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14'
            >
                <h1 className='text-4xl font-semibold'>Sign In</h1>

                <div className='space-y-4'>
                    <label className='inline-block w-full'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='input'
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <p className='p-1 text-[13px] font-light text-orange-500'>
                                Please enter a valid email.
                            </p>
                        )}
                    </label>
                    <label className='inline-block w-full'>
                        <input
                            type='password'
                            placeholder='Password'
                            className='input'
                            {...register('password', { required: true })}
                        />
                        {errors.password && (
                            <p className='p-1 text-[13px] font-light text-orange-500'>
                                Your password must contain between 6 and 60 character.
                            </p>
                        )}
                    </label>
                </div>

                <button className='w-full rounded bg-[#e50914] py-3 font-semibold'>
                    Sign In
                </button>

                <div>
                    New to Netflix?{' '}
                    <button type='submit' className='text-white hover:underline'>
                        Sign up now
                    </button>
                </div>
            </form>
        </div>
    );
}
