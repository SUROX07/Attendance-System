import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default function AttendanceGraph({currAttendance}:{currAttendance:number}) {
    const attendancePercentage = currAttendance;

    const data = Array(10).fill(0).map((_, i) => ({
    name: i + 1,
    ideal: 60,
    actual: attendancePercentage,
    }));

  return (
    <div className="w-full h-64 p-4 rounded-2xl  ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* Hide X-Axis */}
          <XAxis dataKey="name" tick={false} axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }} />

          {/* Y-Axis showing percentage only */}
          <YAxis
            domain={[0, 100]}
            tickFormatter={(tick) => `${tick}%`}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
          />

          <Tooltip formatter={(value) => `${value}%`} />

          {/* Goal Line - 75% attendance */}
          <Line
            type="monotone"
            dataKey="ideal"
            stroke="rgba(54,171,214,0.8)"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />

          {/* Actual attendance line */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
