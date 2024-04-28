import { ProductColumn } from "@/components/products/Columns";
import ProductClient from "@/components/products/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isArchived: product.isArchived,
    isFeatured: product.isFeatured,
    price: product.price,
    category: product.category.name,
    size: product.size.name,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
