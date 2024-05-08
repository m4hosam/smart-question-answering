import React from "react";
import Link from "next/link";
import { LoginForm } from "@/components/forms/loginForm";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col mt-5 md:flex-row justify-between items-center">
      <div className="w-72 h-96  flex flex-col items-center  gap-5">
        <h3 className="text-neutral-600 font-semibold">User</h3>
        <div className="flex flex-col items-start w-full pl-14">
          <p className="text-neutral-400">Email: user@gmail.com</p>
          <p className="text-neutral-400">password: 123456</p>
        </div>
        <h3 className="text-neutral-600 font-semibold">Teacher</h3>
        <div className="flex flex-col items-start w-full pl-14">
          <p className="text-neutral-400">Email: teacher@gmail.com</p>
          <p className="text-neutral-400">password: 123456</p>
        </div>
        <h3 className="text-neutral-600 font-semibold">Admin</h3>
        <div className="flex flex-col items-start w-full pl-14">
          <p className="text-neutral-400">Email: admin@gmail.com</p>
          <p className="text-neutral-400">password: 123456</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/account/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
