import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isPaid: boolean;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  totalPrice: string | number;
  products: string;
  createdAt: string;
};

export const Columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
