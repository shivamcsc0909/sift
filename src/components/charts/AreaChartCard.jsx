import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../ui/Card";

export default function AreaChartCard({ title, data, dataKey = "present", secondaryKey }) {
  return (
    <Card className="min-h-80 min-w-0">
      <h3 className="mb-4 font-bold text-text-primary">{title}</h3>
      <div className="h-60 min-h-60 min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220}>
          <AreaChart data={data}>
            <CartesianGrid stroke="#E7ECE9" strokeDasharray="4 4" />
            <XAxis dataKey="month" stroke="#8A928C" fontSize={12} />
            <YAxis stroke="#8A928C" fontSize={12} />
            <Tooltip />
            <Area type="monotone" dataKey={dataKey} stroke="#39BDA1" fill="#7FD9C5" fillOpacity={0.35} />
            {secondaryKey ? <Area type="monotone" dataKey={secondaryKey} stroke="#F4C95D" fill="#F4C95D" fillOpacity={0.22} /> : null}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
