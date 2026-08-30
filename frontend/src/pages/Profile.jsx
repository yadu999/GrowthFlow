import { User, Mail, Shield } from "lucide-react";

export default function Profile() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500">
          Merchant Account
        </p>

        <h1 className="text-5xl font-bold text-gray-900 mt-2">
          Profile
        </h1>

        <p className="text-gray-600 mt-3 max-w-3xl text-lg">
          Manage your account information and workspace profile.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-[#5B3FD8] text-white flex items-center justify-center text-3xl font-bold">
            Y
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Yaduvansh</h2>
            <p className="text-gray-500">Merchant Admin</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="border rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <User className="text-[#5B3FD8]" size={18} />
              <span className="font-medium">Name</span>
            </div>
            <p>Yaduvansh</p>
          </div>

          <div className="border rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="text-[#5B3FD8]" size={18} />
              <span className="font-medium">Email</span>
            </div>
            <p>merchant@growthflow.ai</p>
          </div>

          <div className="border rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-[#5B3FD8]" size={18} />
              <span className="font-medium">Role</span>
            </div>
            <p>Merchant Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}