import React from "react";

import Link from "next/link";

import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/forms/registerForm";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* form */}
        <RegisterForm />
      </div>
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-10 text-center text-sm text-gray-500">
          Already a User ?{" "}
          <Link
            href="/account/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
