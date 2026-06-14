"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

interface ChartProps {
  monthlyData: { month: string; count: number }[];
  domainData: { name: string; value: number }[];
  ratioData: { name: string; value: number }[];
}

const COLORS = ["#0ea5e9", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#ec4899", "#f43f5e"];

export function AdminCharts({ monthlyData, domainData, ratioData }: ChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      {/* Chart 1: Monthly Applications */}
      <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-6">
          Applications by Month
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ left: -20, right: 10 }}>
              <XAxis dataKey="month" stroke="#7F8C8D" fontSize={10} tickLine={false} />
              <YAxis stroke="#7F8C8D" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0F2233", borderColor: "#1E3A4C", borderRadius: "8px" }}
                labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
              />
              <Bar dataKey="count" fill="#F97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Domain-wise Applications */}
      <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-6">
          Domain-wise Breakdown
        </h3>
        <div className="h-64 flex flex-col justify-between">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F2233", borderColor: "#1E3A4C", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom legend */}
          <div className="flex flex-wrap gap-2 justify-center mt-2 max-h-12 overflow-y-auto">
            {domainData.map((d, i) => (
              <span key={d.name} className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 3: Selection Ratio */}
      <div className="p-6 bg-[#0F2233] border border-[#1E3A4C] rounded-2xl shadow-xl">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-6">
          Status Ratio Distribution
        </h3>
        <div className="h-64 flex flex-col justify-between">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {ratioData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === "Selected"
                          ? "#10b981"
                          : entry.name === "Pending"
                            ? "#f59e0b"
                            : entry.name === "Rejected"
                              ? "#ef4444"
                              : "#3B82F6"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F2233", borderColor: "#1E3A4C", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center mt-2">
            {ratioData.map((d) => {
              const bg =
                d.name === "Selected"
                  ? "bg-emerald-500"
                  : d.name === "Pending"
                    ? "bg-amber-500"
                    : d.name === "Rejected"
                      ? "bg-rose-500"
                      : "bg-blue-500";
              return (
                <span key={d.name} className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-300">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${bg}`} />
                  {d.name}: {d.value}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminCharts;
