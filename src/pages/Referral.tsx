import React, { useState } from "react";

const Referral = () => {
  const [balance, setBalance] = useState(6.0);
  const [earningHistory, setEarningHistory] = useState([
    { id: 1, amount: "$2.00", date: "2025-07-01" },
    { id: 2, amount: "$2.00", date: "2025-07-03" },
    { id: 3, amount: "$2.00", date: "2025-07-05" },
  ]);
  const [redeemCodes, setRedeemCodes] = useState([
    { code: "RCODE-1234", amount: "$6.00", date: "2025-07-08", expired: false },
    { code: "RCODE-5678", amount: "$4.00", date: "2025-06-30", expired: true },
  ]);
  const [referralPersons] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      firstDeposit: "$20.00",
      date: "2025-07-01",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      firstDeposit: "$15.00",
      date: "2025-07-03",
    },
  ]);

  function generateRedeemCode() {
    const code = `RCODE-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().slice(0, 10);
    setRedeemCodes((prev) => [
      { code, amount: `$${balance.toFixed(2)}`, date: today, expired: false },
      ...prev,
    ]);
    setEarningHistory((prev) => [
      { id: prev.length + 1, amount: `- Redeem a voucher`, date: today },
      ...prev,
    ]);
    setBalance(0);
  }

  return (
    <div className="relative">
      {/* Full-page Glassmorphism Overlay */}

      {/* Referral Page Content (blurred behind overlay) */}
      <div className="p-4 md:p-8 max-w-4xl mx-auto border bg-white filter blur-sm">
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md z-50">
          <div className="px-10 py-6 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#006bff] mb-4">
              Coming Soon
            </h1>
            <p className="text-lg text-gray-700">
              This feature is under development. Stay tuned!
            </p>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Invite and <span className="text-[#006bff]">earn 10%</span> from the
          first deposit of those invited
        </h2>
        <p className="mb-6 text-gray-700">
          Send your referral link and earn 10% USD from the first deposit of
          users you invite. Additionally, the invited user will receive a 10%
          bonus on their first deposit!
        </p>

        {/* Earnings */}
        <div className="bg-gray-100border rounded-lg p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-lg font-semibold mb-2">Earnings</div>
            <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
            <div className="text-gray-500 text-sm">
              {referralPersons.length} referred users
            </div>
          </div>
          <button
            className="px-6 py-2 bg-[#006bff] text-white rounded-md hover:bg-[#0056cc] font-semibold mt-2 md:mt-0"
            onClick={generateRedeemCode}
            disabled={balance <= 0}
          >
            Generate Redeem Code
          </button>
        </div>

        {/* ... Rest of your tables and content ... */}
      </div>
    </div>
  );
};

export default Referral;
