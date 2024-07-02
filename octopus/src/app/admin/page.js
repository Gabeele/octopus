"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import TimeCards from "./Timecards"

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("timeDashboard")

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Tabs defaultValue="timeDashboard" value={activeTab} onValueChange={setActiveTab} className="border-b">
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
