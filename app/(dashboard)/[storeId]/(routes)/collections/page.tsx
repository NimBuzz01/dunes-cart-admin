import { CollectionColumn } from "@/components/collections/Columns";
import CollectionClient from "@/components/collections/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const CollectionsPage = async ({ params }: { params: { storeId: string } }) => {
  const collections = await prismadb.collection.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCollections: CollectionColumn[] = collections.map(
    (collection) => ({
      id: collection.id,
      title: collection.title,
      description: collection.description,
      createdAt: format(collection.createdAt, "MMMM do, yyyy"),
    }),
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CollectionClient data={formattedCollections} />
      </div>
    </div>
  );
};

export default CollectionsPage;
