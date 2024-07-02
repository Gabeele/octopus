'use client';

import { useState, useEffect } from 'react';
import LoginModal from "@/components/LoginModal";
import { getAllUsers, validateUserPin, getUser, getTime, punchIn, punchOut } from "./action";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

function TimeCardPage() {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timeEntries, setTimeEntries] = useState([]);
    const [currentPunch, setCurrentPunch] = useState(null);
    const [clock, setClock] = useState(new Date());
    const [weeklyHours, setWeeklyHours] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');

    const greetings = ["Hey", "Hi there", "What's up", "Hello", "Greetings"];

    const handleLoginSuccess = async (userId) => {
        const user = await getUser(userId);
        setAuthenticatedUser(user);
        setLoading(false);
        await loadTimeEntries(user.id);
        setCurrentPunch(user.isPunchedIn);
    };

    const handleOpenChange = (isOpen) => {
        if (!isOpen && !authenticatedUser) {
            setLoading(false);
        }
    };

    const loadTimeEntries = async (userId) => {
        setLoading(true);
        const entries = await getTime(userId);
        setTimeEntries(entries);
        calculateWeeklyHours(entries);
        setLoading(false);
    };

    const calculateWeeklyHours = (entries) => {
        const weekHours = entries.reduce((total, entry) => {
            if (entry.clockOut) {
                const clockInTime = new Date(entry.clockIn).getTime();
                const clockOutTime = new Date(entry.clockOut).getTime();
                const hours = (clockOutTime - clockInTime) / 1000 / 60 / 60;
                total += hours;
            }
            return total;
        }, 0);
        setWeeklyHours(weekHours.toFixed(2));
    };

    const handlePunchIn = async () => {
        await punchIn(authenticatedUser.id);
        setCurrentPunch(true);
        await loadTimeEntries(authenticatedUser.id);
    };

    const handlePunchOut = async () => {
        const lastEntry = timeEntries[timeEntries.length - 1];
        if (lastEntry && new Date(lastEntry.clockIn).getTime() < (Date.now() - 12 * 60 * 60 * 1000)) {
            setShowModal(true);
        } else {
            await punchOut(authenticatedUser.id);
            setCurrentPunch(false);
            await loadTimeEntries(authenticatedUser.id);
        }
    };

    const handleModalSubmit = async () => {
        const lastEntry = timeEntries[timeEntries.length - 1];
        const endDate = new Date(lastEntry.clockIn);
        endDate.setHours(endHour);
        endDate.setMinutes(endMinute);
        await punchOut(authenticatedUser.id, endDate); // Adjust this function to accept a date parameter
        setCurrentPunch(false);
        await loadTimeEntries(authenticatedUser.id);
        setShowModal(false);
        setEndHour('');
        setEndMinute('');
    };

    const handleLogout = () => {
        setAuthenticatedUser(null);
        setTimeEntries([]);
        setCurrentPunch(null);
        setWeeklyHours(0);
    };

    useEffect(() => {
        const interval = setInterval(() => setClock(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: timeEntries.map(entry => entry.date),
        datasets: [
            {
                label: 'Hours Worked',
                data: timeEntries.map(entry => {
                    if (entry.clockOut) {
                        const clockInTime = new Date(entry.clockIn).getTime();
                        const clockOutTime = new Date(entry.clockOut).getTime();
                        return (clockOutTime - clockInTime) / 1000 / 60 / 60;
                    }
                    return 0;
                }),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
            }
        ],
    };

    const getGreeting = () => {
        const hour = clock.getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        if (hour < 22) return "Good evening";
        return greetings[Math.floor(Math.random() * greetings.length)];
    };

    return (
        <div className="grid gap-8 p-6 sm:p-10">
            {loading ? (
                <Skeleton className="h-8 w-1/2" />
            ) : authenticatedUser ? (
                <div className="grid gap-4">
                    <div className="flex justify-between items-center px-1">
                        <h1 className='text-2xl'>{getGreeting()}, {authenticatedUser.firstName}!</h1>
                        <Button variant="outline" className="bg-red-600 text-white" onClick={handleLogout}>Logout</Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Time Sheet</CardTitle>
                            <CardDescription>Track your hours and view your weekly summary.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-lg">
                                    <div className="text-4xl font-bold">
                                        <span className="text-primary">{clock.getHours()}</span>:<span className="text-primary">{clock.getMinutes()}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">Current Time</div>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-lg">
                                    <div className={`text-4xl font-bold ${currentPunch ? 'text-green-500' : 'text-red-500'}`}>{currentPunch ? 'Clocked In' : 'Clocked Out'}</div>
                                    <div className="text-sm text-muted-foreground">{currentPunch ? `Since ${new Date(authenticatedUser.lastPunchIn).toLocaleTimeString()}` : 'Currently not punched in'}</div>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Button className="w-full" onClick={handlePunchIn} disabled={currentPunch}>Clock In</Button>
                                <Button className="w-full" onClick={handlePunchOut} disabled={!currentPunch}>Clock Out</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex flex-row gap-4">
                        <Card className="w-1/2">
                            <CardHeader>
                                <CardTitle>Clock In/Out Times</CardTitle>
                            </CardHeader>
                            <CardContent className="relative w-full overflow-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Clock In</TableHead>
                                            <TableHead>Clock Out</TableHead>
                                            <TableHead>Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {timeEntries.map((entry, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{entry.date}</TableCell>
                                                <TableCell>{entry.clockIn ? new Date(entry.clockIn).toLocaleTimeString() : 'Not clocked in'}</TableCell>
                                                <TableCell>{entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString() : 'Not clocked out'}</TableCell>
                                                <TableCell>{entry.clockOut ? ((new Date(entry.clockOut).getTime() - new Date(entry.clockIn).getTime()) / 1000 / 60 / 60).toFixed(2) + 'h' : 'N/A'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card className="w-1/2">
                            <CardHeader>
                                <CardTitle>Weekly Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-[16/9]">
                                    <Line data={chartData} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center justify-between">
                                    <div className='pr-1'>Total Hours</div>
                                    <div className="text-2xl font-bold">{weeklyHours}</div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                            <div className="bg-white rounded-lg p-6 w-1/3">
                                <h2 className="text-xl mb-4">Hey, I see that you may have forgotten to clock out from your previous shift. Please enter the time you ended your shift at.</h2>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="w-1/3 text-right">Hour:</label>
                                        <input
                                            type="number"
                                            className="w-2/3 p-2 border rounded"
                                            value={endHour}
                                            onChange={(e) => setEndHour(e.target.value)}
                                            min="0"
                                            max="23"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="w-1/3 text-right">Minute:</label>
                                        <input
                                            type="number"
                                            className="w-2/3 p-2 border rounded"
                                            value={endMinute}
                                            onChange={(e) => setEndMinute(e.target.value)}
                                            min="0"
                                            max="59"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-4 mt-4">
                                        <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                                        <Button variant="primary" onClick={handleModalSubmit}>Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <LoginModal
                    getUsers={getAllUsers}
                    validateUser={validateUserPin}
                    onLoginSuccess={handleLoginSuccess}
                    onOpenChange={handleOpenChange}
                />
            )}
        </div>
    );
}

export default TimeCardPage;
