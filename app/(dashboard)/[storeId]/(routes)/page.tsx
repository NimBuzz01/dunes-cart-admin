import {
  getGraphRevenue,
  getStockSize,
  getTotalRevenue,
  getTotalSales,
} from "@/actions/actions";
import Heading from "@/components/ui/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { priceFormat } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const revenue = await getTotalRevenue(params.storeId);
  const salesCount = await getTotalSales(params.storeId);
  const stockCount = await getStockSize(params.storeId);
  const graphData = await getGraphRevenue(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold lg:text-2xl">
                {priceFormat.format(revenue)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Number of sales
              </CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold lg:text-2xl">{salesCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Products In stock
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold lg:text-2xl">{stockCount}</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <Overview data={graphData} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
