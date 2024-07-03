"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Calendar as CalendarIcon } from "lucide-react"
import { getAllUsers, getUser, punchIn, punchOut, markAsPaid, updateTimeCard } from "./action" // Adjust the import path as needed

export default function TimeCards() {
    const [searchTerm, setSearchTerm] = useState("")
    const [dateRange, setDateRange] = useState({ start: null, end: null })
    const [status, setStatus] = useState("all")
    const [employeeFilter, setEmployeeFilter] = useState("all")
    const [timecards, setTimecards] = useState([])
    const [loading, setLoading] = useState(true)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [alertDialogOpen, setAlertDialogOpen] = useState(false)
    const [selectedTimeCard, setSelectedTimeCard] = useState(null)
    const [clockInDate, setClockInDate] = useState("")
    const [clockInHour, setClockInHour] = useState("")
    const [clockInMinute, setClockInMinute] = useState("")
    const [clockInPeriod, setClockInPeriod] = useState("AM")
    const [clockOutDate, setClockOutDate] = useState("")
    const [clockOutHour, setClockOutHour] = useState("")
    const [clockOutMinute, setClockOutMinute] = useState("")
    const [clockOutPeriod, setClockOutPeriod] = useState("AM")

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
                (employeeFilter === "all" || timecard.employee === employeeFilter) &&
                (status === "all" || (status === "unpaid" && !timecard.isPaid) || (status === "paid" && timecard.isPaid)) &&
                (!start || clockInDate >= new Date(start)) &&
                (!end || (clockOutDate && clockOutDate <= new Date(end)))
            )
        })
    }, [searchTerm, dateRange, status, employeeFilter, timecards])

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

    const handleEditClick = (timecard) => {
        setSelectedTimeCard(timecard)
        const clockIn = new Date(timecard.clockIn)
        setClockInDate(clockIn.toISOString().split('T')[0])
        setClockInHour(clockIn.getHours() % 12 || 12)
        setClockInMinute(clockIn.getMinutes())
        setClockInPeriod(clockIn.getHours() >= 12 ? "PM" : "AM")

        if (timecard.clockOut) {
            const clockOut = new Date(timecard.clockOut)
            setClockOutDate(clockOut.toISOString().split('T')[0])
            setClockOutHour(clockOut.getHours() % 12 || 12)
            setClockOutMinute(clockOut.getMinutes())
            setClockOutPeriod(clockOut.getHours() >= 12 ? "PM" : "AM")
        } else {
            setClockOutDate("")
            setClockOutHour("")
            setClockOutMinute("")
            setClockOutPeriod("AM")
        }
        setEditDialogOpen(true)
    }

    const handleMarkAsPaid = async () => {
        const timeCardIds = filteredTimecards.map(timecard => timecard.id)
        await markAsPaid(timeCardIds)
        setTimecards((prev) =>
            prev.map((timecard) =>
                timeCardIds.includes(timecard.id) ? { ...timecard, isPaid: true } : timecard
            )
        )
        setAlertDialogOpen(false)
    }

    const handleSave = async () => {
        const clockInHour24 = clockInPeriod === "PM" ? (parseInt(clockInHour, 10) % 12) + 12 : parseInt(clockInHour, 10) % 12
        const clockOutHour24 = clockOutPeriod === "PM" ? (parseInt(clockOutHour, 10) % 12) + 12 : parseInt(clockOutHour, 10) % 12
        const clockIn = new Date(`${clockInDate}T${clockInHour24.toString().padStart(2, '0')}:${clockInMinute.toString().padStart(2, '0')}:00Z`)
        const clockOut = clockOutDate ? new Date(`${clockOutDate}T${clockOutHour24.toString().padStart(2, '0')}:${clockOutMinute.toString().padStart(2, '0')}:00Z`) : null
        await updateTimeCard(selectedTimeCard.id, clockIn, clockOut)
        const updatedUser = await getUser(selectedTimeCard.userId)
        setTimecards((prev) => [
            ...prev.filter((card) => card.userId !== selectedTimeCard.userId),
            ...updatedUser.timeCards.map((card) => ({ ...card, employee: `${updatedUser.firstName} ${updatedUser.lastName}` })),
        ])
        setEditDialogOpen(false)
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
                                    ? `${new Date(dateRange.start).toLocaleDateString()} - ${new Date(dateRange.end).toLocaleDateString()}`
                                    : "Start Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-auto">
                            <Calendar mode="range" onSelect={(range) => setDateRange(range)} className="p-4" />
                        </PopoverContent>
                    </Popover>
                </div>
                <Select value={employeeFilter} onValueChange={setEmployeeFilter} className="w-auto bg-white">
                    <SelectTrigger>
                        <SelectValue placeholder="Employee" className="bg-white" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Employees</SelectItem>
                        {timecards.map((timecard) => (
                            <SelectItem key={timecard.userId} value={timecard.employee}>{timecard.employee}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={status} onValueChange={setStatus} className="w-auto bg-white">
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                </Select>
                <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <Button>Mark Shown as Paid</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Mark Shown as Paid</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div>Are you sure you want to mark all shown timecards as paid?</div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button onClick={handleMarkAsPaid}>Confirm</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </header>
            <main className="flex-1 overflow-auto p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Clock In</TableHead>
                            <TableHead>Clock Out</TableHead>
                            <TableHead>Total Hours</TableHead>
                            <TableHead>Paid Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTimecards.map((timecard) => (
                            <TableRow key={timecard.id}>
                                <TableCell>{timecard.employee}</TableCell>
                                <TableCell>{new Date(timecard.clockIn).toLocaleString()}</TableCell>
                                <TableCell>{timecard.clockOut ? new Date(timecard.clockOut).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    {timecard.clockOut
                                        ? `${Math.floor((new Date(timecard.clockOut) - new Date(timecard.clockIn)) / 3600000)}h ${Math.floor(((new Date(timecard.clockOut) - new Date(timecard.clockIn)) % 3600000) / 60000)}m`
                                        : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <Badge className={timecard.isPaid ? "bg-green-700" : "bg-red-800"}>
                                        {timecard.isPaid ? "Paid" : "Unpaid"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditClick(timecard)} variant="outline" className='mr-2'>
                                        Edit
                                    </Button>
                                    <Button onClick={() => console.log()} variant="outline">Mark as Paid</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>

            {selectedTimeCard && (
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Time Card</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div>
                                <h1 className="text-lg">{selectedTimeCard.employee}</h1>
                            </div>
                            <div>
                                <label>Clock In Date</label>
                                <Input type="date" value={clockInDate} onChange={(e) => setClockInDate(e.target.value)} className="mb-2" />
                                <div className="grid grid-cols-3 gap-2">
                                    <Input type="number" placeholder="Hour" value={clockInHour} onChange={(e) => setClockInHour(e.target.value)} />
                                    <Input type="number" placeholder="Minute" value={clockInMinute} onChange={(e) => setClockInMinute(e.target.value)} />
                                    <Select value={clockInPeriod} onValueChange={setClockInPeriod} className="w-auto bg-white">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AM">AM</SelectItem>
                                            <SelectItem value="PM">PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <label>Clock Out Date</label>
                                <Input type="date" value={clockOutDate} onChange={(e) => setClockOutDate(e.target.value)} className="mb-2" />
                                <div className="grid grid-cols-3 gap-2">
                                    <Input type="number" placeholder="Hour" value={clockOutHour} onChange={(e) => setClockOutHour(e.target.value)} />
                                    <Input type="number" placeholder="Minute" value={clockOutMinute} onChange={(e) => setClockOutMinute(e.target.value)} />
                                    <Select value={clockOutPeriod} onValueChange={setClockOutPeriod} className="w-auto bg-white">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AM">AM</SelectItem>
                                            <SelectItem value="PM">PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSave}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
