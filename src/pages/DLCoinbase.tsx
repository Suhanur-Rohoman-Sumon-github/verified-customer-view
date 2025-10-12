import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";
import React from "react";

const DLCoinbase: React.FC = () => {
  return (
    <div className="min-h-screen  p-8">
      <div className=" rounded-lg p-6 shadow mb-6">
        <div className="mb-4 flex flex-wrap gap-4 items-center">
          <span className="font-semibold">Price:</span>
          <Input type="text" placeholder="from" className=" w-20" />
          <span>-</span>
          <Input type="text" placeholder="to" className=" w-20" />
          <Input type="text" placeholder="Country" className=" w-32" />
          <Input type="text" placeholder="ZIP" className=" w-24" />
          <Input type="text" placeholder="BANK" className=" w-32" />
          <Button className="bg-[#006bff] hover:bg-[#0056cc] text-white">
            Search
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full  rounded-lg">
            <thead>
              <tr className="text-[#006bff] text-left">
                <th className="py-2 px-4">Country</th>
                <th className="py-2 px-4">ZIP</th>
                <th className="py-2 px-4">BANK</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  country: "USA",
                  zip: "10458",
                  bank: "CITIBANK",
                  price: "12.50$",
                },
                {
                  country: "USA",
                  zip: "23224",
                  bank: "BANK OF AMERICA",
                  price: "12.50$",
                },
                {
                  country: "USA",
                  zip: "72104",
                  bank: "COSTAL COMMUNITY BANK",
                  price: "12.50$",
                },
                {
                  country: "USA",
                  zip: "76450",
                  bank: "CHASE BANK",
                  price: "12.50$",
                },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-2 px-4">{row.country}</td>
                  <td className="py-2 px-4">{row.zip}</td>
                  <td className="py-2 px-4">{row.bank}</td>
                  <td className="py-2 px-4">{row.price}</td>
                  <td className="py-2 px-4">
                    <Button className="bg-[#006bff] hover:bg-[#0056cc] text-white">
                      <ShoppingCart size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DLCoinbase;
