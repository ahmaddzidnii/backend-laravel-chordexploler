import { z } from "zod";
import { RefObject, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const formCreateSongSchema = z.object({
  title: z.string().nonempty("Title is required"),
  artist: z.string().nonempty("Artist name is required"),
  status: z.enum(["draft", "published"]),
  key: z.string().nonempty("Key is required"),
  cover: z.instanceof(File, { message: "File required" }).refine(
    (file) => {
      if (!file) return false;

      return file.size <= MAX_FILE_SIZE;
    },
    {
      message: `File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    }
  ),
  youtube_url: z.string().url(),
  genre: z.string().nonempty("Genre is required"),
  released_year: z
    .string()
    .nonempty("Released year is required")
    .regex(/^\d{4}$/, "Invalid year format"),
  publisher: z.string().nonempty("Publisher is required"),
  bpm: z.string().nonempty("BPM is required").regex(/^\d+$/, "Invalid BPM format"),
});

interface CreateSongFormProps {
  formRef: RefObject<HTMLFormElement | null>;
  onFormSubmit?: (values: z.infer<typeof formCreateSongSchema>) => void;
}

const CreateSongForm = ({ formRef, onFormSubmit }: CreateSongFormProps) => {
  const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formCreateSongSchema>>({
    resolver: zodResolver(formCreateSongSchema),
    defaultValues: {
      title: "",
      artist: "",
      status: "draft",
      key: "",
      cover: undefined,
      youtube_url: "",
      genre: "",
      released_year: "",
      publisher: "",
      bpm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formCreateSongSchema>) {
    onFormSubmit && onFormSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-2 w-full"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter song title"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide a title for the song.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Artist */}
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter artist name"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide the artist's name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Key */}

        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Key"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide the key's name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cover Image with Type Validation */}

        <FormField
          control={form.control}
          name="cover"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              {selectedImageURL && (
                <div>
                  <img
                    src={selectedImageURL}
                    alt="preview"
                    className=" aspect-square size-80 rounded-md"
                  />
                </div>
              )}
              <FormControl>
                <Input
                  {...rest}
                  onChange={(e) => {
                    onChange(e.target.files && e.target.files[0]);

                    const file = e.target.files && e.target.files[0];

                    if (file) {
                      setSelectedImageURL(URL.createObjectURL(file));
                    }
                  }}
                  type="file"
                  accept="image/*"
                />
              </FormControl>
              <FormDescription>Upload a cover image 1 x 1.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Youtube URL */}
        <FormField
          control={form.control}
          name="youtube_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Youtube URL"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide the youtube URL.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Genre */}

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Genre"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide the genre's name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Released Year */}

        <FormField
          control={form.control}
          name="released_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Released Year</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Released Year"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide the released year.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Publisher */}

        <FormField
          control={form.control}
          name="publisher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publisher</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Publisher"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide the publisher's name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BPM */}
        <FormField
          control={form.control}
          name="bpm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BPM</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter BPM"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide the BPM.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CreateSongForm;
