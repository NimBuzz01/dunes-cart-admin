"use client";

import { useState } from "react";
import { z } from "zod";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
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
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/alertModal";
import { Category } from "@prisma/client";
import ImageUpload from "./ui/ImageUpload";

interface CategoryFormProps {
  initialData: Category | null;
}
const formSchema = z.object({
  name: z.string().min(3),
  imageUrl: z.string().min(1),
});
type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit a Category" : "Create a new Category";
  const action = initialData ? "save changes" : "Create";
  const toastMessage = initialData ? "Changes saved" : "Category Created";

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params?.storeId}/categories/${params?.categoryId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Failed to to save settings");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`,
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("category deleted!");
    } catch (error) {
      toast.error("You can't delete a category containing products");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        isOpen={isOpen}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={() => setIsOpen(true)}
            size="sm"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image (Icon)</FormLabel>
                <FormControl>
                  <ImageUpload
                    values={field.value ? [field.value] : []}
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>
                    Label describing your category
                  </FormDescription>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Category label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
