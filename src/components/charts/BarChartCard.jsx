import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../ui/Card";

export default function BarChartCard({ title, data, dataKey = "count", xKey = "stage" }) {
  return (
    <Card className="min-h-80 min-w-0">
      <h3 className="mb-4 font-bold text-text-primary">{title}</h3>
      <div className="h-60 min-h-60 min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220}>
          <BarChart data={data}>
            <CartesianGrid stroke="#E7ECE9" strokeDasharray="4 4" />
            <XAxis dataKey={xKey} stroke="#8A928C" fontSize={12} />
            <YAxis stroke="#8A928C" fontSize={12} />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#39BDA1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
