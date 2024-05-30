'use client';
import { useState } from "react";
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"



const ProductSupport = () => {
  const [showArchived, setShowArchived] = useState(false);

  const handleSwitchChange = (event) => {
    setShowArchived(event.target.checked);
  };

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
          <div className="flex items-center space-x-2">
            <Switch checked={showArchived} onChange={handleSwitchChange} />
            <Label htmlFor="archivedVisible">Show Archived</Label>
          </div>
          <AddReturnModal />
        </div>
      </div>
      <div className="overflow-x-auto">
        <ReturnTable showArchived={showArchived} />
      </div>
      <AddReturnModal />
    </div>
  );
};



export default ProductSupport;
