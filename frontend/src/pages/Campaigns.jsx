import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";

export default function Campaigns() {
  return (
    <Layout>
      <PageWrapper>

        <h1 className="text-4xl font-bold mb-8">
          Campaigns
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <p className="text-gray-400">
            Upcoming AI-driven WhatsApp and Email campaigns.
          </p>

        </div>

      </PageWrapper>
    </Layout>
  );
}