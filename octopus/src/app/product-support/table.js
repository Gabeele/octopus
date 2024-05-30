'use client';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import Record from "./record";
import fetchReturns from "./actions";
import { useEffect, useState } from "react";

function ReturnTable() {
    const [returns, setReturns] = useState([]);

    useEffect(() => {
        refresh();
    }, []);

    async function refresh() {
        const fetchedReturns = await fetchReturns();
        setReturns(fetchedReturns);
        console.log(returns)
    }

    return (
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
                {returns.length > 0 ? (
                    returns.map((ret) => (
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
                            refresh={refresh}
                        />
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan="10" className="text-center">
                            No records found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
};

export default ReturnTable;
