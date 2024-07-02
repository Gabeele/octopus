'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ResponsiveLine } from '@nivo/line';
import { getAllUsers, getUser, getTime, punchIn, punchOut, validateUserPin } from './action';
import LoginModal from '@/components/LoginModal';

export default function Component() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [user, setUser] = useState(null);
    const [timeCards, setTimeCards] = useState([]);
    const [isPunchedIn, setIsPunchedIn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (isLoggedIn) {
                const userData = await getUser(user); // Replace with actual user ID
                const timeData = await getTime(user); // Replace with actual user ID
                setUser(userData);
                setTimeCards(timeData);
                setIsPunchedIn(userData.isPunchedIn);
            }
        }

        fetchData();
    }, [isLoggedIn]);

    const handlePunchIn = async () => {
        await punchIn(1); // Replace with actual user ID
        setIsPunchedIn(true);
    };

    const handlePunchOut = async () => {
        await punchOut(1); // Replace with actual user ID
        setIsPunchedIn(false);
    };

    const handleLogin = async (userId, pin) => {
        const isValid = await validateUserPin(userId, pin);
        if (isValid) {
            setIsLoggedIn(true);
            setShowLoginModal(false);
        } else {
            alert('Invalid PIN');
        }
    };

    if (!isLoggedIn) {
        return <LoginModal validateUser={validateUserPin} onLoginSuccess={setUser} getUsers={getAllUsers} />;
    }

    return (
        <div className="grid gap-8 p-6 sm:p-10">
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Time Sheet</CardTitle>
                        <CardDescription>Track your hours and view your weekly summary.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-lg">
                                <div className="text-4xl font-bold">
                                    <span className="text-primary">{currentTime.getHours()}</span>:<span className="text-primary">{currentTime.getMinutes()}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">Current Time</div>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-lg">
                                <div className={`text-4xl font-bold ${isPunchedIn ? 'text-green-500' : 'text-red-500'}`}>
                                    {isPunchedIn ? 'Clocked In' : 'Clocked Out'}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {isPunchedIn ? `Since ${user?.timeCards[0]?.clockIn.toLocaleTimeString()}` : 'Not currently clocked in'}
                                </div>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Button className="w-full" onClick={handlePunchIn} disabled={isPunchedIn}>
                                Clock In
                            </Button>
                            <Button variant="secondary" className="w-full" onClick={handlePunchOut} disabled={!isPunchedIn}>
                                Clock Out
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineChart className="aspect-[16/9]" data={timeCards} />
                    </CardContent>
                    <CardFooter>
                        <div className="flex items-center justify-between">
                            <div>Total Hours</div>
                            <div className="text-2xl font-bold">40</div> {/* Replace with actual calculation */}
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <Card>
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
                            {timeCards.map((card, index) => (
                                <TableRow key={index}>
                                    <TableCell>{card.date}</TableCell>
                                    <TableCell>{card.clockIn}</TableCell>
                                    <TableCell>{card.clockOut}</TableCell>
                                    <TableCell>{/* Calculate total hours */}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

function LineChart({ data }) {
    const chartData = [
        {
            id: 'Time Worked',
            data: data.map(card => ({
                x: card.date,
                y: (new Date(card.clockOut) - new Date(card.clockIn)) / (1000 * 60 * 60) // Convert milliseconds to hours
            }))
        }
    ];

    return (
        <div>
            <ResponsiveLine
                data={chartData}
                margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{ tickSize: 0, tickPadding: 16 }}
                axisLeft={{ tickSize: 0, tickValues: 5, tickPadding: 16 }}
                colors={['#2563eb']}
                pointSize={6}
                useMesh={true}
                gridYValues={6}
                theme={{
                    tooltip: {
                        chip: { borderRadius: '9999px' },
                        container: { fontSize: '12px', textTransform: 'capitalize', borderRadius: '6px' }
                    },
                    grid: { line: { stroke: '#f3f4f6' } }
                }}
                role="application"
            />
        </div>
    );
}
