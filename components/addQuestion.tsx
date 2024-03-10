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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { set } from "react-hook-form";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { FileInput, Label } from "flowbite-react";
import UploadQuestionForm from "@/components/forms/uploadQuestionForm";

export default function AddQuestion() {
  const [image, setImage] = useState("");
  const [question, setQuestion] = useState("");

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
      setImage(result);
    };
  };
  return (
    <Tabs defaultValue="upload" className="w-[90%] min-h-96 mx-auto mt-9">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="add">Add</TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <Card className="min-h-[60vh]">
          {/* <CardHeader>
            <CardTitle className="text-center">Upload Question</CardTitle>
          </CardHeader> */}
          <CardContent className="space-y-2">
            <UploadQuestionForm />
          </CardContent>
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
