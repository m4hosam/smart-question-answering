"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { UserToken } from "@/types/common.types";
import { Label } from "@/components/ui/label";
import { FaRegCopy } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import { updateUserById } from "@/lib/adminController";
import { useSession } from "next-auth/react";
const FormSchema = z.object({
  name: z.string({
    required_error: "Please add name.",
  }),
  email: z.string().email().trim().min(1, {
    message: "email must be at least 2 characters.",
  }),
  role: z.string({
    required_error: "Please select category.",
  }),
});

export default function EditUserForm({ user }: { user: UserToken }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isTokenCopied, setIsTokenCopied] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    // console.log(user.token);
    const AdminToken = session?.user?.token ?? "";
    const response = await updateUserById(user.id, data, AdminToken);
    if (response?.status === 200) {
      toast.success("User updated successfully");
      // router.push("/admin");
    } else {
      toast.error("Error updating user");
    }
    // console.log(response);
  }

  return (
    <Form {...form}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <form
        className="flex flex-col  items-center justify-between gap-6 mt-4"
        onSubmit={form.handleSubmit(onSubmit)}
        // onSubmit={handleFormSubmit}
      >
        <Toaster position="bottom-right" reverseOrder={false} />

        <h2 className="text-2xl font-semibold leading-none tracking-tight text-center">
          Edit User
        </h2>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="user_id">Id</Label>
          <Input disabled value={user.id} id="user_id" placeholder="User ID" />
        </div>
        {/* token */}
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="user_token">Token</Label>
          <div className="flex items-center  gap-5">
            <Input
              disabled
              value={user.token}
              id="user_token"
              placeholder="User Token"
            />
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(user.token);
                setIsTokenCopied(true);
              }}
            >
              {isTokenCopied ? <MdOutlineDone /> : <FaRegCopy />}
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select question category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mx-auto w-40">Save</Button>
      </form>
    </Form>
  );
}
