import { getContactStats } from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default async function ContactStats() {
  const stats: any = await getContactStats();

  console.log(stats)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 mt-10">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total??'0'}</div>
          </CardContent>
        </CardHeader>
      </Card>

       <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">New</CardTitle>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.newCount??'0'}</div>
          </CardContent>
        </CardHeader>
      </Card>

       <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Read</CardTitle>
          <CardContent>
            <div className="text-2xl font-bold  text-orange-600">{stats.readCount??'0'}</div>
          </CardContent>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Replied</CardTitle>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.repliedCount??'0'}</div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
