"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/Tiptap";

import { useSectionFormStore } from "../../store/useSectionForm";
import { useCreateSection } from "../../hooks/useCreateSection";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSongId } from "@/hooks/useSongId";

export const formCreateSectionSchema = z.object({
  name: z.string().nonempty("Name is required"),
  start_time: z.string().nonempty("Start time is required").regex(/^\d+$/, "Invalid time format"),
  end_time: z.string().nonempty("End time is required").regex(/^\d+$/, "Invalid time format"),
  content: z.string().nonempty("Content is required"),
});

const SectionForm = () => {
  const songId = useSongId();
  const createSection = useCreateSection();
  const { disableEditing } = useSectionFormStore();

  const form = useForm<z.infer<typeof formCreateSectionSchema>>({
    resolver: zodResolver(formCreateSectionSchema),
    defaultValues: {
      name: "",
      start_time: "",
      end_time: "",
      content: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formCreateSectionSchema>) => {
    createSection.mutate(
      {
        ...values,
        start_time: parseInt(values.start_time),
        end_time: parseInt(values.end_time),
        song_id: songId,
      },
      {
        onSuccess: () => {
          form.reset();

          disableEditing();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="border flex flex-col p-4 space-y-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter section name"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start time</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Start Time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>End time</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="End Time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem className="w-full">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Tiptap onUpdate={(val) => form.setValue("content", val)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            variant="outline"
            className="mr-2"
            onClick={disableEditing}
          >
            Cancel
          </Button>
          <Button disabled={createSection.isPending}>Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default SectionForm;
