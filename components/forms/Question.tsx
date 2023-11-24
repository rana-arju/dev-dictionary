"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { QuestionSchema } from "@/lib/validation";
import { createQuestion } from "@/lib/actions/question.action";
const type: any = "create";
function Question() {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
    console.log("values 😘🥰😘", values);
    
    try {
      await createQuestion({});
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  // const handleKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   field: any
  // ) => {
  //   if (e.key === "Enter" && field.name === "tags") {
  //     e.preventDefault();

  //     const tagInput = e.target as HTMLInputElement;
  //     const tagValue = tagInput.value.trim();
  //     console.log("tagValue", field);
  //     if (tagValue !== "") {
  //       if (tagValue.length > 15) {
  //         return form.setError("tags", {
  //           type: "required",
  //           message: "Tag must be less then 15 characters",
  //         });
  //       }
  //       if (!field.value.includes(tagValue as never)) {
  //         form.setValue("tags", [...field.value, tagValue]);
  //         tagInput.value = ""; // Set the value to an empty string
  //         form.clearErrors("tags");
  //       }
  //     } else {
  //       form.trigger();
  //     }
  //   }
  // };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      
      if (!Array.isArray(field.value)) {
        form.setValue("tags", []); // Initialize as an empty array
      }
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = ""; // Set the value to an empty string
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };
  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    placeholder="Question title"
                    {...field}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Be specific and imagine you&apos;re asking a question to
                  another person.
                </FormDescription>
                <FormMessage className="text-red-900" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Details explanation of your problem
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  {/* =================== Add editor ================= */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    initialValue=""
                    onBlur={field.onBlur}
                    onEditorChange={(content) =>  field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        " codesample |bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="text-red-900" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <>
                    <Input
                      placeholder="Add tags..."
                      {...field}
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                      onKeyDown={(e) => handleKeyDown(e, field)}
                    />
                    {Array.isArray(field.value) && field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {field.value.map((tag: any) => (
                          <Badge
                            key={tag}
                            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                            onClick={() => handleTagRemove(tag, field)}
                          >
                            {tag}
                            <Image
                              src={"/assets/icons/close.svg"}
                              alt="close icon"
                              height={12}
                              width={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Add up to 3 tags to describe what your question is about. You
                  need to press enter to add a tag.
                </FormDescription>
                <FormMessage className="text-red-900" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient w-full !text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>{type === "edit" ? "Editing...." : "Posting..."}</>
            ) : (
              <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Question;
