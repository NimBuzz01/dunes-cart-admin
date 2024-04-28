"use client";

import { Plus } from "lucide-react";
import Heading from "../ui/Heading";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { CollectionColumn, Columns } from "./Columns";
import { DataTable } from "../ui/dataTable";
import ApiList from "../ApiList";

interface CollectionClientProps {
  data: CollectionColumn[];
}

const CollectionClient = ({ data }: CollectionClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading
          title={`Collections (${data?.length})`}
          description="Manage collections for your store"
        />
        <Button
          className="w-fit text-sm"
          onClick={() => router.push(`/${params?.storeId}/collections/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="text-lg">create</span>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={Columns} data={data} />
      <Heading title="API" description="API calls for collections" />
      <Separator />
      <ApiList entityName="collections" entityIdName="collectionId" />
    </>
  );
};

export default CollectionClient;
