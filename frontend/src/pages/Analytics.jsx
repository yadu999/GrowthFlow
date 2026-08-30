
import PageWrapper from "../components/PageWrapper";
import RevenueChart from "../components/RevenueChart";
import MetricCard from "../components/MetricCard";

export default function Analytics() {
  return (
    
      <PageWrapper>

        <h1 className="text-4xl font-bold mb-8">
          Analytics
        </h1>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <MetricCard title="Recovered Revenue" value="₹1.2L" change="+24%" />
          <MetricCard title="WhatsApp CTR" value="41%" change="+9%" />
          <MetricCard title="ROI" value="3.8x" change="+1.1x" />
        </div>

        <RevenueChart />

      </PageWrapper>
  
  );
}