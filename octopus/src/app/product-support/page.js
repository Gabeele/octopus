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
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

async function fetchReturns() {
  const data = await prisma.return.findMany({
    where: {
      isArchived: false,
    },
    orderBy: {
      returnDate: "desc",
    },
  });
  return data;
}

const ProductSupport = async () => {
  const returns = await fetchReturns();
  console.log(returns);

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
              <TableRow key={ret.id}>
                <TableCell>{ret.batteryDetails}</TableCell>
                <TableCell>{ret.customerName}</TableCell>
                <TableCell>{ret.customerPhone}</TableCell>
                <TableCell>{ret.currentVoltage}</TableCell>
                <TableCell>{ret.cca}</TableCell>
                <TableCell>{ret.customerType}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={ret.status}

                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Holding">Holding</SelectItem>
                      <SelectItem value="CCG">CCG</SelectItem>
                      <SelectItem value="NG">NG</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{new Date(ret.returnDate).toLocaleDateString()}</TableCell>
                <TableCell>{ret.notes}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="outline"

                  >
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Archive</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div >
  );
};

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width="24px"
      height="24px"
    >
      <path
        fill="#000000"
        d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8"
      />
    </svg>
  );
}

export default ProductSupport;
