import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SyncPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Sync</h1>
        <p className="text-muted-foreground mt-2">
          Manage content synchronization from external sources.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sync Status</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Sync status and controls will go here */}
        </CardContent>
      </Card>
    </div>
  );
}