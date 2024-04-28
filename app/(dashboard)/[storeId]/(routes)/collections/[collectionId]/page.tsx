import CollectionForm from "@/components/CollectionForm";
import prismadb from "@/lib/prismadb";
import {} from "@prisma/client";
import React from "react";

const CollectionPage = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collection = await prismadb.collection.findFirst({
    where: {
      id: params.collectionId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <CollectionForm initialData={collection} />
      </div>
    </div>
  );
};

export default CollectionPage;
