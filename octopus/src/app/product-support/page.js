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


const ProductSupport = async () => {
  const returns = await fetchReturns();

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Battery</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Voltage</TableHead>
              <TableHead>CCA</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Archive</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {returns.map((ret) => (
              <Record
                key={ret.id}
                battery={ret.battery}
                name={ret.name}
                phone={ret.phone}
                voltage={ret.voltage}
                cca={ret.cca}
                type={ret.type}
                status={ret.status}
                date={ret.date}
                notes={ret.notes}
                id={ret.id}
                refresh={fetchReturns}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <AddReturnModal />
    </div>
  );
};



export default ProductSupport;
