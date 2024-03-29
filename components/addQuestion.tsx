"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import UploadQuestionForm from "@/components/forms/uploadQuestionForm";
import AddQuestionForm from "@/components/forms/addQuestionForm";

export default function AddQuestion() {
  return (
    <Tabs defaultValue="upload" className="w-[90%] min-h-96 mx-auto mt-9">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="add">Add</TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <Card className="min-h-[60vh]">
          <CardContent className="space-y-2">
            {/* <UploadQuestionForm /> */}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="add">
        <Card className="min-h-[60vh]">
          <CardContent className="space-y-2">
            <AddQuestionForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
