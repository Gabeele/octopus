"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, PenBox } from "lucide-react"
import { getAllUsers, getUser, punchIn, punchOut } from "./action" // Adjust the import path as needed

export default function TimeCards() {
    const [searchTerm, setSearchTerm] = useState("")
    const [dateRange, setDateRange] = useState({ start: null, end: null })
    const [status, setStatus] = useState("all")
    const [timecards, setTimecards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const users = await getAllUsers()
            const timecardsData = []
            for (const user of users) {
                const userData = await getUser(user.id)
                userData.timeCards.forEach(card => {
                    timecardsData.push({ ...card, employee: `${user.firstName} ${user.lastName}` })
                })
            }
            setTimecards(timecardsData)
            setLoading(false)
        }

        fetchData()
    }, [])

    const filteredTimecards = useMemo(() => {
        return timecards.filter((timecard) => {
            const { start, end } = dateRange
            const clockInDate = new Date(timecard.clockIn)
            const clockOutDate = timecard.clockOut ? new Date(timecard.clockOut) : null
            return (
                (timecard.employee && timecard.employee.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (status === "all" || timecard.status === status) &&
                (!start || clockInDate >= start) &&
                (!end || (clockOutDate && clockOutDate <= end))
            )
        })
    }, [searchTerm, dateRange, status, timecards])

    const handlePunchIn = async (userId) => {
        setLoading(true)
        await punchIn(userId)
        const updatedUser = await getUser(userId)
        setTimecards((prev) => [
            ...prev.filter((card) => card.userId !== userId),
            ...updatedUser.timeCards.map((card) => ({ ...card, employee: `${updatedUser.firstName} ${updatedUser.lastName}` })),
        ])
        setLoading(false)
    }

    const handlePunchOut = async (userId) => {
        setLoading(true)
        await punchOut(userId)
        const updatedUser = await getUser(userId)
        setTimecards((prev) => [
            ...prev.filter((card) => card.userId !== userId),
            ...updatedUser.timeCards.map((card) => ({ ...card, employee: `${updatedUser.firstName} ${updatedUser.lastName}` })),
        ])
        setLoading(false)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col h-full">
            <header className="bg-muted/40 px-6 py-4 flex items-center gap-4">
                <div className="grid gap-1">
                    <h1 className="text-2xl font-bold">Employee Timecards</h1>
                    <p className="text-muted-foreground">View and manage employee timecards for your organization.</p>
                </div>
                <Input
                    type="search"
                    placeholder="Search by employee name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                />
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                {dateRange.start && dateRange.end
                                    ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
                                    : "Start Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-auto">
                            <Calendar mode="range" onSelect={(range) => setDateRange(range)} className="p-4" />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                {dateRange.start && dateRange.end ? `${dateRange.end.toLocaleDateString()}` : "End Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-auto">
                            <Calendar mode="range" onSelect={(range) => setDateRange(range)} className="p-4" />
                        </PopoverContent>
                    </Popover>
                </div>
                <Select value={status} onValueChange={setStatus} className="w-auto">
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
            </header>
            <main className="flex-1 overflow-auto p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Clock In</TableHead>
                            <TableHead>Clock Out</TableHead>
                            <TableHead>Total Hours</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTimecards.map((timecard) => (
                            <TableRow key={timecard.id}>
                                <TableCell>{timecard.employee}</TableCell>
                                <TableCell>{timecard.clockIn}</TableCell>
                                <TableCell>{timecard.clockOut}</TableCell>
                                <TableCell>{timecard.totalHours}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            timecard.status === "approved" ? "green" : timecard.status === "pending" ? "yellow" : "red"
                                        }
                                    >
                                        {timecard.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {timecard.clockOut === null ? (
                                        <Button onClick={() => handlePunchOut(timecard.userId)} variant="outline" size="icon">
                                            Punch Out
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handlePunchIn(timecard.userId)} variant="outline" size="icon">
                                            Punch In
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </div>
    )
}
