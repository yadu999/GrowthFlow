import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";

export default function Settings() {
  return (
    <Layout>
      <PageWrapper>

        <h1 className="text-4xl font-bold mb-8">
          Settings
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">

          <div>
            <p className="text-gray-400 mb-2">AI Model</p>

            <input
              value="Gemini 3.6 Flash"
              readOnly
              className="w-full bg-[#111827] rounded-xl p-3"
            />
          </div>

          <div>
            <p className="text-gray-400 mb-2">Recovery Threshold</p>

            <input type="range" defaultValue={80} className="w-full" />
          </div>

        </div>

      </PageWrapper>
    </Layout>
  );
}