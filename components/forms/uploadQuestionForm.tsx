"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";
import { FileInput, Label } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import {
  createQuestion,
  extractQurestionFromImage,
} from "@/lib/questionController";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UploadQuestionForm() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [image, setImage] = useState<File | null>(null); // Store image as a file object
  const [similarQLink, setSimilarQLink] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Please upload an image");
    }
    setImage(file); // Store the image as a file object
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!session) {
      router.push("/account/login");
    }
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image");
    } else {
      setLoading(true);
      const extractionResponse = await extractQurestionFromImage(image);
      if (extractionResponse?.status !== 200) {
        console.log(extractionResponse?.data);
        toast.error("Error in Extracting text.");
        setLoading(false);
      } else {
        const userQuestion = {
          ...extractionResponse?.data,
          token: session?.user.token as string,
        };
        console.log(userQuestion);
        // saving the extracted question to the DB
        const questionResponse = await createQuestion(userQuestion);
        if (questionResponse?.status === 200) {
          toast.success("Question added successfully.");
          setImage(null);
        } else if (questionResponse?.status === 409) {
          toast.error("Question asked before.");
          setSimilarQLink(questionResponse.data.similarQuestions[0].id);
          console.log(questionResponse.data.similarQuestions);
        } else if (questionResponse?.status === 403) {
          toast.error("Not Autherized.");
        } else {
          toast.error("Error in saving question.");
        }
      }
      setLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col items-center justify-between gap-8 mt-4"
      onSubmit={handleFormSubmit}
    >
      <Toaster position="bottom-right" reverseOrder={false} />

      <h2 className="text-2xl font-semibold leading-none tracking-tight text-center">
        Upload Question
      </h2>
      {similarQLink && (
        <Alert variant="destructive">
          <AlertTitle>Similar Question</AlertTitle>
          <AlertDescription>
            Question has been asked before.{" "}
            <Link
              className="underline text-blue-500"
              href={"/question/" + similarQLink}
            >
              link
            </Link>
          </AlertDescription>
        </Alert>
      )}
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
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          {image && (
            <Image
              src={URL.createObjectURL(image)} // Use Object URL to display image
              className="sm:p-10 absolute w-96 max-h-72 object-contain z-20"
              alt="image"
              width={200}
              height={200}
            />
          )}
          <FileInput
            id="dropzone-file"
            name="image"
            onChange={(e) => handleChangeImage(e)}
            className="hidden"
          />
        </Label>
      </div>
      <Button type="submit" className="mx-auto w-40" disabled={loading}>
        {loading ? (
          <div className="flex flex-row items-center gap-2">
            <svg
              aria-hidden="true"
              role="status"
              className="w-4 h-4  text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-white">Detecting Text...</p>
          </div>
        ) : (
          "Upload"
        )}
      </Button>
    </form>
  );
}
