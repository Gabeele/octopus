'use client';

import { useState, useEffect } from 'react';
import LoginModal from "@/components/LoginModal";
import { getAllUsers, validateUserPin, getUser, getTime, punchIn, punchOut } from "./action";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js to use it with react-chartjs-2

function TimeCardPage() {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timeEntries, setTimeEntries] = useState([]);
    const [currentPunch, setCurrentPunch] = useState(null);
    const [clock, setClock] = useState(new Date());
    const [weeklyHours, setWeeklyHours] = useState(0);

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
        await punchOut(authenticatedUser.id);
        setCurrentPunch(false);
        await loadTimeEntries(authenticatedUser.id);
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

    return (
        <div>
            <h1>Time Card</h1>
            {loading ? (
                <Skeleton className="h-8 w-1/2" />
            ) : authenticatedUser ? (
                <div>
                    <p>Welcome, {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                    <p>Current Time: {clock.toLocaleTimeString()}</p>
                    {currentPunch ? (
                        <p>You are currently punched in</p>
                    ) : (
                        <p>You are currently punched out</p>
                    )}
                    <Button variant="outline" onClick={handlePunchIn} disabled={currentPunch}>Punch In</Button>
                    <Button variant="outline" onClick={handlePunchOut} disabled={!currentPunch}>Punch Out</Button>
                    <h2>This Week's Time Entries</h2>
                    <ul>
                        {timeEntries.map((entry, index) => (
                            <li key={index}>
                                {entry.date}: {entry.clockIn ? `In: ${new Date(entry.clockIn).toLocaleTimeString()}` : 'Not clocked in'} - {entry.clockOut ? `Out: ${new Date(entry.clockOut).toLocaleTimeString()}` : 'Not clocked out'}
                            </li>
                        ))}
                    </ul>
                    <h2>Total Hours This Week: {weeklyHours}</h2>
                    <div>
                        <Line data={chartData} />
                    </div>
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
