"use client";
import React, { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileInput, Label } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import Tesseract from "tesseract.js";
import tesseract from "node-tesseract-ocr";

export default function UploadQuestionForm() {
  const [image, setImage] = useState<string>();
  const [ocrText, setOcrText] = useState<string>("");

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
  const handleOCR = async () => {
    if (image) {
      Tesseract.recognize(image, "tur", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        console.log("OCR", text);
        setOcrText(text);
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image === "") {
      toast.error("Please upload an image");
    } else {
      await handleOCR();
      toast(ocrText, {
        icon: "🛈",
      });
      console.log(image);
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
              src={image}
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
      <Button type="submit" className="mx-auto w-40">
        Upload
      </Button>
    </form>
  );
}
