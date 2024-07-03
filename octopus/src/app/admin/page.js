"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import TimeCards from "./Timecards"

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("dashboard")

    return (
        <div className="">

            <Tabs defaultValue="timeDashboard" value={activeTab} onValueChange={setActiveTab} className="">
                <TabsList className="flex">
                    <TabsTrigger value="dashboard"> Dashboard</TabsTrigger>
                    <TabsTrigger value="timecards">Time Cards</TabsTrigger>
                    <TabsTrigger value="cashflow">Cashflow</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
                <TabsContent value="timeDashboard" className="py-8">
                    {/* <PageTimeDashboard /> */}
                </TabsContent>
                <TabsContent value="timecards" className="py-8">
                    <TimeCards />
                </TabsContent>
                <TabsContent value="cashflow" className="py-8">
                    {/* <PageCashflow /> */}
                </TabsContent>
                <TabsContent value="users" className="py-8">
                    {/* <PageUsers /> */}
                </TabsContent>
            </Tabs>
        </div>
    )
}
