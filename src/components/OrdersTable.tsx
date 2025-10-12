/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import { useGetMySsnQuery } from "@/redux/fetures/ssns/ssn.api";
import { useCurrentUser } from "@/utils/getCurrentUser";

export function OrdersTable() {
  const user = useCurrentUser();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { data, error, isLoading, refetch } = useGetMySsnQuery(user._id);

  const orders = data?.data || [];

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

  const downloadSelectedData = () => {
    const selectedOrders =
      selectedRows.length > 0
        ? orders.filter((o: any) => selectedRows.includes(o._id))
        : orders;

    const serializedContent = selectedOrders
      .map(
        (o: any) => `
ID: ${o._id}
Full Name: ${o.fullName}
SSN: ${o.ssn}
Date of Birth: ${o.dateOfBirth}
City: ${o.city}
State: ${o.state}
ZIP Code: ${o.zipecode}
Phone: ${o.phone || "N/A"}
Email: ${o.email || "N/A"}
Price: $${o.price || 0}
Created At: ${formatDate(o.createdAt)}
----------------------------------------
`
      )
      .join("\n");

    const blob = new Blob([serializedContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
            <div className="flex gap-2 items-center">
              <Button
                onClick={downloadSelectedData}
                size="sm"
                className="bg-[#006bff] hover:bg-[#0056cc] text-white"
              >
                Download All
              </Button>
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
                <thead className="sticky top-0 bg-[#006bff] text-white">
                  <tr>
                    <th className="text-left p-2">
                      <Checkbox
                        checked={
                          selectedRows.length === orders.length &&
                          orders.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-2 text-xs font-medium">Name</th>
                    <th className="text-left p-2 text-xs font-medium">SSN</th>
                    <th className="text-left p-2 text-xs font-medium">City</th>
                    <th className="text-left p-2 text-xs font-medium">State</th>
                    <th className="text-left p-2 text-xs font-medium">ZIP</th>
                    <th className="text-left p-2 text-xs font-medium">DOB</th>
                    <th className="text-left p-2 text-xs font-medium">Price</th>
                    <th className="text-right p-2 text-xs font-medium">
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
                        className="border-b hover:bg-[#e6f0ff] text-sm text-[#222]"
                      >
                        <td className="p-2">
                          <Checkbox
                            checked={selectedRows.includes(order._id)}
                            onCheckedChange={() => handleRowSelect(order._id)}
                          />
                        </td>
                        <td className="p-2 text-xs font-medium">
                          {order.fullName}
                        </td>
                        <td className="p-2 text-xs">{order.ssn}</td>
                        <td className="p-2 text-xs">{order.city}</td>
                        <td className="p-2 text-xs">{order.state}</td>
                        <td className="p-2 text-xs">{order.zipecode}</td>
                        <td className="p-2 text-xs">{order.dateOfBirth}</td>
                        <td className="p-2 text-xs font-semibold">
                          ${order.price?.toFixed(2)}
                        </td>
                        <td className="p-2 text-right">
                          <Download
                            size={18}
                            className="inline-block text-[#006bff] opacity-70 hover:opacity-100 cursor-pointer"
                            onClick={() => {
                              const serializedContent = `
ID: ${order._id}
Full Name: ${order.fullName}
SSN: ${order.ssn}
Date of Birth: ${order.dateOfBirth}
City: ${order.city}
State: ${order.state}
ZIP Code: ${order.zipecode}
Phone: ${order.phone || "N/A"}
Email: ${order.email || "N/A"}
Price: $${order.price || 0}
Created At: ${formatDate(order.createdAt)}
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
