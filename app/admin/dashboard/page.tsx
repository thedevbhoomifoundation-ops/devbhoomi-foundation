import { prisma } from "@/lib/db";
import { AdminCharts } from "@/components/admin/charts";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Award,
  BookOpen
} from "lucide-react";

export default async function AdminDashboard() {
  // 1. Fetch main counts
  const [
    totalCount,
    pendingCount,
    underReviewCount,
    shortlistedCount,
    selectedCount,
    rejectedCount,
    activeCount,
    completedCount,
    volunteerCount,
  ] = await Promise.all([
    prisma.internshipApplication.count(),
    prisma.internshipApplication.count({ where: { status: "PENDING" } }),
    prisma.internshipApplication.count({ where: { status: "UNDER_REVIEW" } }),
    prisma.internshipApplication.count({ where: { status: "SHORTLISTED" } }),
    prisma.internshipApplication.count({ where: { status: "SELECTED" } }),
    prisma.internshipApplication.count({ where: { status: "REJECTED" } }),
    prisma.internshipApplication.count({ where: { status: "INTERNSHIP_ACTIVE" } }),
    prisma.internshipApplication.count({ where: { status: "COMPLETED" } }),
    prisma.volunteerApplication.count(),
  ]);

  // 2. Fetch Domain-wise counts
  const domainGroups = await prisma.internshipApplication.groupBy({
    by: ["domain"],
    _count: {
      id: true,
    },
  });

  const domainData = domainGroups.map((g) => ({
    name: g.domain,
    value: g._count.id,
  }));

  // 3. Fetch applications for monthly breakdown (last 6 months)
  const applications = await prisma.internshipApplication.findMany({
    select: {
      appliedDate: true,
    },
  });

  // Calculate monthly counts
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyCounts: Record<string, number> = {};

  // Initialize last 6 months
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const label = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
    monthlyCounts[label] = 0;
  }

  applications.forEach((app) => {
    const date = new Date(app.appliedDate);
    const label = `${monthNames[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`;
    if (label in monthlyCounts) {
      monthlyCounts[label]++;
    }
  });

  const monthlyData = Object.entries(monthlyCounts).map(([month, count]) => ({
    month,
    count,
  }));

  // 4. Status ratio data
  const ratioData = [
    { name: "Pending", value: pendingCount + underReviewCount + shortlistedCount },
    { name: "Selected", value: selectedCount + activeCount },
    { name: "Rejected", value: rejectedCount },
    { name: "Completed", value: completedCount },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Overview & Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time metrics for internship applications, registration channels, and statuses.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {/* Metric 1 */}
        <div className="p-4 bg-[#0F2233] border border-[#1E3A4C] rounded-xl shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Apps</div>
          <div className="text-xl font-black text-white mt-1 flex items-center justify-between">
            {totalCount}
            <FileText className="h-4 w-4 text-sky-400" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 bg-[#0F2233] border border-[#1E3A4C] rounded-xl shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending</div>
          <div className="text-xl font-black text-amber-500 mt-1 flex items-center justify-between">
            {pendingCount}
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 bg-[#0F2233] border border-[#1E3A4C] rounded-xl shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shortlisted</div>
          <div className="text-xl font-black text-indigo-400 mt-1 flex items-center justify-between">
            {shortlistedCount}
            <BookOpen className="h-4 w-4 text-indigo-400" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 bg-[#0F2233] border border-[#1E3A4C] rounded-xl shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selected</div>
          <div className="text-xl font-black text-emerald-400 mt-1 flex items-center justify-between">
            {selectedCount}
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          </div>
        </div>

        {/* Metric 5 */}
        <div className="p-4 bg-[#0F2233] border border-[#1E3A4C] rounded-xl shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rejected</div>
          <div className="text-xl font-black text-rose-500 mt-1 flex items-center justify-between">
            {rejectedCount}
            <XCircle className="h-4 w-4 text-rose-500" />
          </div>
        </div>

        {/* Metric 6 */}
        <div className="p-4 bg-[#0F2233] border border-[#1E3A4C] rounded-xl shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active</div>
          <div className="text-xl font-black text-teal-400 mt-1 flex items-center justify-between">
            {activeCount}
            <Award className="h-4 w-4 text-teal-400" />
          </div>
        </div>

        {/* Metric 7 */}
        <div className="p-4 bg-[#0F2233] border border-[#1E3A4C] rounded-xl shadow-md">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Volunteers</div>
          <div className="text-xl font-black text-[#F97316] mt-1 flex items-center justify-between">
            {volunteerCount}
            <Users className="h-4 w-4 text-[#F97316]" />
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <AdminCharts
        monthlyData={monthlyData}
        domainData={domainData.length > 0 ? domainData : [{ name: "No Data", value: 0 }]}
        ratioData={ratioData.length > 0 ? ratioData : [{ name: "No Data", value: 0 }]}
      />
    </div>
  );
}
