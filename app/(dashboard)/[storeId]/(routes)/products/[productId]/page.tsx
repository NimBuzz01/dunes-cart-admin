import ProductForm from "@/components/ProductForm";
import prismadb from "@/lib/prismadb";
import {} from "@prisma/client";
import React from "react";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findFirst({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <ProductForm initialData={product} categories={categories} />
      </div>
    </div>
  );
};

export default ProductPage;
