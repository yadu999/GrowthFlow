import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import AgentTimeline from "../components/AgentTimeline";

export default function Recovery() {
  return (
    <Layout>
      <PageWrapper>

        <h1 className="text-4xl font-bold mb-8">
          AI Recovery
        </h1>

        <AgentTimeline step={3} />

      </PageWrapper>
    </Layout>
  );
}