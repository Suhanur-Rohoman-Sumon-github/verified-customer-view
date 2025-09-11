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
    <div className="p-4 md:p-8 max-w-4xl mx-auto border bg-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 ">
        Invite and <span className="text-[#006bff]">earn 10%</span> from the
        first deposit of those invited
      </h2>
      <p className="mb-6 text-gray-700">
        Send your referral link and earn 10% USD from the first deposit of users
        you invite. Additionally, the invited user will receive a 10% bonus on
        their first deposit!
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

      {/* Referral Link */}
      <div className="bg-gray-100border rounded-lg p-4 mb-6">
        <div className="text-lg font-semibold mb-2">
          Your personal referral link
        </div>
        <div className="flex gap-2 mb-1">
          <input
            type="text"
            value="https://ssnbit.cc/register?invite=142914892052090887497912"
            readOnly
            className="flex-1 px-3 py-2 bg-gray-100 border rounded-md text-gray-700"
          />
          <button className="px-4 py-2 bg-[#006bff] text-white rounded-md hover:bg-[#0056cc]">
            Copy
          </button>
        </div>
        <div className="text-xs text-gray-500">
          Share this link on your blog, newsletter, or with friends.
        </div>
      </div>

      {/* Earning History */}
      <div className="bg-gray-100border rounded-lg p-4 mb-6">
        <div className="text-lg font-semibold mb-2">Earning History</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 font-semibold">ID</th>
                <th className="py-2 px-3 font-semibold">Amount</th>
                <th className="py-2 px-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {earningHistory.map((row) => (
                <tr key={row.id}>
                  <td className="py-2 px-3">{row.id}</td>
                  <td className="py-2 px-3">{row.amount}</td>
                  <td className="py-2 px-3">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redeem Codes Table */}
      <div className="bg-gray-100border rounded-lg p-4 mb-6">
        <div className="text-lg font-semibold mb-2">Redeem Codes</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 font-semibold">Code</th>
                <th className="py-2 px-3 font-semibold">Amount</th>
                <th className="py-2 px-3 font-semibold">Date</th>
                <th className="py-2 px-3 font-semibold">Expired</th>
              </tr>
            </thead>
            <tbody>
              {redeemCodes.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-3 font-mono">{row.code}</td>
                  <td className="py-2 px-3">{row.amount}</td>
                  <td className="py-2 px-3">{row.date}</td>
                  <td className="py-2 px-3">
                    {row.expired ? (
                      <span className="text-red-500">Expired</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Referral Persons Table */}
      <div className="bg-gray-100border rounded-lg p-4 mb-6">
        <div className="text-lg font-semibold mb-2">Referred Users</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 font-semibold">Name</th>
                <th className="py-2 px-3 font-semibold">Email</th>
                <th className="py-2 px-3 font-semibold">First Deposit</th>
                <th className="py-2 px-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {referralPersons.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-3">{row.name}</td>
                  <td className="py-2 px-3">{row.email}</td>
                  <td className="py-2 px-3">{row.firstDeposit}</td>
                  <td className="py-2 px-3">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referral;
