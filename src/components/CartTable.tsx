/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Spinner from "./spinner/Spinner";
import { toast } from "sonner";

import { useCurrentUser } from "@/utils/getCurrentUser";
import {
  useBuySSnMutation,
  useGetCartQuery,
} from "@/redux/fetures/ssns/ssn.api";

interface CartItem {
  _id: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  country: string;
  price: number;
}

export default function CartTable() {
  const user = useCurrentUser();
  const { data, isLoading, refetch } = useGetCartQuery(user?._id!, {
    skip: !user?._id, // only run query when user exists
  });
  const [buy, { isLoading: isBuying }] = useBuySSnMutation();

  useEffect(() => {
    if (user?._id) refetch();
  }, [user, refetch]);

  const handleBuy = async (ssnId: string) => {
    try {
      await buy({
        ssnId,
        userId: user?._id,
        price: 0.25,
      }).unwrap();

      toast.success("Purchase successful!");

      setTimeout(() => {
        refetch();
      }, 500);
    } catch (error: any) {
      console.error("Buy failed:", error);
      toast.error(
        error?.data?.message || "Failed to purchase. Please try again."
      );
    }
  };

  return (
    <Card className="bg-gray-100 text-[#006bff] border-0">
      <CardHeader>
        {data?.data?.length === 1 && (
          <div>
            <p className="text-red-600 font-semibold mb-4 text-center">
              Please buy these SSNs immediately or other users may purchase your
              selected SSNs. Be careful!
            </p>
            <CardTitle>My Cart ({data?.data?.length || 0})</CardTitle>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : data?.data?.length === 0 ? (
          <p className="text-center text-gray-500 py-4">Your cart is empty</p>
        ) : (
          <ScrollArea className="h-[500px]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center">
                <thead className="sticky top-0 bg-[#006bff] text-white">
                  <tr>
                    <th className="p-2">Full Name</th>
                    <th className="p-2">City</th>
                    <th className="p-2">State</th>
                    <th className="p-2">ZIP</th>
                    <th className="p-2">DOB</th>
                    <th className="p-2">Country</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Buy</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item: CartItem) => (
                    <tr key={item._id} className="hover:bg-[#e6f0ff] border-b">
                      <td className="p-2">
                        {item.firstName} {item.lastName}
                      </td>
                      <td className="p-2">{item.city}</td>
                      <td className="p-2">{item.state}</td>
                      <td className="p-2">{item.zipCode}</td>
                      <td className="p-2">
                        {item.dateOfBirth
                          ? new Date(item.dateOfBirth).toLocaleDateString(
                              "en-CA"
                            )
                          : "N/A"}
                      </td>
                      <td className="p-2">{item.country || "USA"}</td>
                      <td className="p-2">${item.price || 0.25}</td>
                      <td className="p-2">
                        <Button
                          size="sm"
                          className="bg-[#006bff] hover:bg-[#0056cc] text-white"
                          onClick={() => handleBuy(item._id)}
                        >
                          <ShoppingCart size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
