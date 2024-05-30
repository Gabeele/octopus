import prisma from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { DialogTrigger } from "@/components/ui/dialog";
import Record from "./record";
import AddReturnModal from "./modal";
import fetchReturns from "./actions";
import ReturnTable from "./table";


const ProductSupport = async () => {

  return (
    <div className="flex flex-col gap-6 px-4 md:px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Charging Bench</h1>
        <div className="flex items-center gap-2">
          <Input
            className="max-w-xs"
            placeholder="Search returns..."
            type="search"
          />
          <AddReturnModal />
        </div>
      </div>
      <div className="overflow-x-auto">
        <ReturnTable />
      </div>
      <AddReturnModal />
    </div>
  );
};



export default ProductSupport;
