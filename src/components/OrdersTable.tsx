/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import { useGetMySsnQuery } from "@/redux/fetures/ssns/ssn.api";
import { useLoadUserFromCookie } from "@/utils/useLoadUserFromCookie";


export function OrdersTable() {
  const user = useLoadUserFromCookie();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { data, error, isLoading, refetch } = useGetMySsnQuery(user._id);

  const orders = data?.data || [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString();
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === orders.length ? [] : orders.map((o) => o._id)
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20 text-[#006bff]">Loading...</div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center py-20">
        Failed to load orders.
      </div>
    );

  return (
    <div className="space-y-6">
      <Card className="flex-1 bg-gray-100 border shadow-xl text-[#006bff]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Purchased SSNs</span>
            <div className="flex gaitems-center">
              <span className="text-sm font-normal text-gray-400">
                {selectedRows.length > 0
                  ? `${selectedRows.length} selected`
                  : `${orders.length} total`}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#006bff] text-white text-center">
                  <tr>
                    <th className=" text-base font-medium">Name</th>
                    <th className=" text-base font-medium">SSN</th>
                    <th className=" text-base font-medium">Address</th>
                    <th className=" text-base font-medium">City</th>
                    <th className=" text-base font-medium">State</th>
                    <th className=" text-base font-medium">ZIP</th>
                    <th className=" text-base font-medium">DOB</th>
                    <th className=" text-base font-medium">Price</th>
                    <th className="text-right text-base font-medium">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center text-gray-500 p-6 text-sm"
                      >
                        No purchased SSNs found.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order: any) => (
                      <tr
                        key={order._id}
                        className="border-b hover:bg-[#e6f0ff] text-sm text-[#222]  text-center"
                      >
                        <td className="text-base  uppercase">
                          {order.firstName} {order.lastName}
                        </td>
                        <td className="text-base">{order.ssnNumber}</td>
                        <td className="text-base uppercase">{order.address}</td>
                        <td className="text-base uppercase">{order.city}</td>
                        <td className="text-base">{order.state}</td>
                        <td className="text-base uppercase">{order.zipCode}</td>
                        <td className="p-2">
                          {order.dateOfBirth
                            ? new Date(order.dateOfBirth).toLocaleDateString(
                                "en-CA"
                              )
                            : "N/A"}
                        </td>
                        <td className="text-base ">
                          ${order.price?.toFixed(2)}
                        </td>
                        <td className="text-right">
                          <Download
                            size={18}
                            className="inline-block text-[#006bff] opacity-70 hover:opacity-100 cursor-pointer"
                            onClick={() => {
                              const serializedContent = `
ID: ${order._id}
Full Name: ${order.firstName} ${order.lastName}
SSN: ${order.ssnNumber}
Address: ${order.address}
City: ${order.city}
State: ${order.state}
ZIP Code: ${order.zipCode}
Date of Birth: ${
                                order.dateOfBirth
                                  ? new Date(
                                      order.dateOfBirth
                                    ).toLocaleDateString("en-CA")
                                  : "N/A"
                              }
Price: $${order.price || 0}
----------------------------------------
`;

                              const blob = new Blob([serializedContent], {
                                type: "text/plain",
                              });
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = `order_${order._id}.txt`;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                              window.URL.revokeObjectURL(url);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
