import { useEffect, useState } from "react";
import { Search, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useBuySSnMutation,
  useGetSSnsQuery,
} from "@/redux/fetures/ssns/ssn.api";
import { useCurrentUser } from "@/utils/getCurrentUser";
import { toast } from "sonner";
import Spinner from "./spinner/Spinner";
import SpinnerOverlay from "./spinner/SpinnerOverlay";

interface SearchResult {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  price: number;
}

export function SearchTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirthFrom: "",
    dateOfBirthTo: "",
    page: 1,
    limit: 10,
  });

  const user = useCurrentUser();
  const [buy, { isLoading: isBuying }] = useBuySSnMutation();
  const { data, isLoading, refetch } = useGetSSnsQuery(filters);

  // Reset selected rows whenever filters or data change
  useEffect(() => {
    setSelectedRows([]);
    refetch();
  }, [filters, refetch]);

  // Helper to update filters
  const updateFilter = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  // Handle buying SSN
  const handleBuy = async (ssnId: string) => {
    try {
      await buy({
        ssnId,
        userId: user?._id,
        price: 0.25,
      }).unwrap();
      toast.success("Purchase successful!");
      refetch(); // refresh data instantly
    } catch (error) {
      console.error("Buy failed:", error);
      toast.error("Failed to purchase. Please try again.");
    }
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (!data?.meta) return;
    if (newPage < 1 || newPage > data.meta.totalPage) return;
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Validate text inputs (letters only)
  const validateText = (value: string) => value.replace(/[^a-zA-Z\s]/g, "");

  // Generate year options for DOB filter
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => `${currentYear - i}`);

  return (
    <div className="space-y-6">
      {/* Filter Card */}
      <Card className="bg-gray-100 text-[#006bff] border-0">
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            <Input
              placeholder="First Name"
              value={filters.firstName}
              onChange={(e) =>
                updateFilter("firstName", validateText(e.target.value))
              }
            />
            <Input
              placeholder="Last Name"
              value={filters.lastName}
              onChange={(e) =>
                updateFilter("lastName", validateText(e.target.value))
              }
            />
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) =>
                updateFilter("city", validateText(e.target.value))
              }
            />
            <Select
              value={filters.state}
              onValueChange={(value) => updateFilter("state", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "CA",
                  "CO",
                  "CT",
                  "DE",
                  "FL",
                  "GA",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "ME",
                  "MD",
                  "MA",
                  "MI",
                  "MN",
                  "MS",
                  "MO",
                  "MT",
                  "NE",
                  "NV",
                  "NH",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "UT",
                  "VT",
                  "VA",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ].map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="ZIP"
              value={filters.zipCode}
              onChange={(e) =>
                updateFilter("zipCode", e.target.value.replace(/[^0-9]/g, ""))
              }
            />

            {/* Year Picker for DOB */}
            <div className="flex gap-2">
              <Select
                value={filters.dateOfBirthFrom}
                onValueChange={(value) =>
                  updateFilter("dateOfBirthFrom", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="From Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filters.dateOfBirthTo}
                onValueChange={(value) => updateFilter("dateOfBirthTo", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="To Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex items-center gap-2 bg-[#006bff] hover:bg-[#0056cc] text-white"
              onClick={() => refetch()}
            >
              <Search size={16} /> Search
            </Button>
            <Button
              variant="outline"
              className="border-[#006bff] text-[#006bff] hover:bg-[#006bff]/10"
              onClick={() =>
                setFilters({
                  firstName: "",
                  lastName: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  dateOfBirthFrom: "",
                  dateOfBirthTo: "",
                  page: 1,
                  limit: 10,
                })
              }
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      {isBuying && <SpinnerOverlay message="Processing your purchase..." />}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Card className="flex-1 bg-gray-100 text-[#006bff] border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Results</span>
              <span className="text-sm font-normal text-[#006bff]/70">
                {selectedRows.length > 0
                  ? `${selectedRows.length} selected`
                  : `${data?.meta?.total ?? 0} total`}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center">
                  <thead className="sticky top-0 bg-[#006bff] text-white">
                    <tr>
                      <th className="p-2">Full Name</th>
                      <th className="p-2">City</th>
                      <th className="p-2">State</th>
                      <th className="p-2">ZIP</th>
                      <th className="p-2">Year</th>
                      <th className="p-2">Country</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Buy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-4 text-gray-500"
                        >
                          No results found
                        </td>
                      </tr>
                    ) : (
                      data?.data?.map((row: SearchResult) => (
                        <tr
                          key={row._id}
                          className="hover:bg-[#e6f0ff] border-b text-center"
                        >
                          <td className="p-2">
                            {row.firstName} {row.lastName}
                          </td>
                          <td className="p-2">{row.city}</td>
                          <td className="p-2">{row.state}</td>
                          <td className="p-2">{row.zipCode}</td>
                          <td className="p-2">
                            {row.dateOfBirth
                              ? new Date(row.dateOfBirth).toLocaleDateString(
                                  "en-CA"
                                )
                              : "N/A"}
                          </td>
                          <td className="p-2">{row.country || "USA"}</td>
                          <td className="p-2">${row.price || 0.25}</td>
                          <td className="p-2">
                            <Button
                              size="sm"
                              className="bg-[#006bff] hover:bg-[#0056cc] text-white"
                              onClick={() => handleBuy(row._id)}
                            >
                              <ShoppingCart size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </ScrollArea>

            {/* Pagination */}
            {data?.meta && (
              <div className="flex justify-center gap-4 items-center mt-4 text-sm text-[#006bff]">
                <Button
                  variant="outline"
                  disabled={filters.page === 1}
                  onClick={() => handlePageChange(filters.page - 1)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> Prev
                </Button>
                <span>
                  Page {filters.page} of {data.meta.totalPage}
                </span>
                <Button
                  variant="outline"
                  disabled={filters.page === data.meta.totalPage}
                  onClick={() => handlePageChange(filters.page + 1)}
                  className="flex items-center gap-1"
                >
                  Next <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
