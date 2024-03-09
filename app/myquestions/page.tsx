// import React from "react";

// const MyQuestions = () => {
//   return <div>MyQuestions page</div>;
// };

// export default MyQuestions;
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { set } from "react-hook-form";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { FileInput, Label } from "flowbite-react";

type Form = {
  image: string;
};
export default function MyQuestions() {
  const [form, setform] = useState<Form>({
    image: "",
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      setform((prev) => ({ ...prev, image: result }));
    };
  };
  return (
    <Tabs defaultValue="upload" className="w-[70%] min-h-96 mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="add">Add</TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <Card className="min-h-[60vh]">
          <CardHeader>
            <CardTitle className="text-center">Upload Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                {form.image && (
                  <Image
                    src={form?.image}
                    className="sm:p-10 absolute w-96 object-contain z-20"
                    alt="image"
                    width={200}
                    height={200}
                  />
                )}
                <FileInput
                  id="dropzone-file"
                  onChange={(e) => handleChangeImage(e)}
                  className="hidden"
                />
              </Label>
            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </CardContent>
          <CardFooter>
            <Button className="mx-auto w-40">Upload</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="add">
        <Card className="min-h-[60vh]">
          <CardHeader>
            <CardTitle className="text-center">Add Manually</CardTitle>
            {/* <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <Textarea placeholder="Enter your question." className="h-64" />
          </CardContent>
          <CardFooter>
            <Button className="mx-auto w-40">Add Question</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
