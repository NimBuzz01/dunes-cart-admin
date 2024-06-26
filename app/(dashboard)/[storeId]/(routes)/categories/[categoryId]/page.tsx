import CategoryForm from "@/components/CategoryForm";
import prismadb from "@/lib/prismadb";
import {} from "@prisma/client";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prismadb.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
