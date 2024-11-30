"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground mt-2">
                        Monitor your platform's performance and activity.
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                <StatsCards />

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RecentActivity />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 