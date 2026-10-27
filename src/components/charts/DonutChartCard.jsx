import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../ui/Card";

const colors = ["#39BDA1", "#7FD9C5", "#F4C95D", "#E4F0D4", "#E57373"];

export default function DonutChartCard({ title, data, valueSuffix = "" }) {
  return (
    <Card className="min-h-80 min-w-0">
      <h3 className="mb-4 font-bold text-text-primary">{title}</h3>
      <div className="grid min-w-0 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:items-center">
        <div className="h-56 min-h-56 min-w-0 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={210}>
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={58} outerRadius={88} paddingAngle={4}>
                {data.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => `${value}${valueSuffix}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-text-secondary"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />{item.name}</span>
              <span className="font-semibold text-text-primary">{item.value}{valueSuffix}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
