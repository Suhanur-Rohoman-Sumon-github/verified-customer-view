import { useEffect, useState } from "react";
import {
  Search,
  X,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  city: string;
  state: string;
  zipCode: string;
  year: number;
  price: number;
  hasPhone: boolean;
  hasEmail: boolean;
  country: string;
  _id: string;
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

  const { data, error, isLoading, refetch } = useGetSSnsQuery(filters);
  useEffect(() => {
    setSelectedRows([]);
    refetch();
  }, [filters, refetch]);
  const user = useCurrentUser();

  // Fetch data with pagination

  const [buy, { isLoading: isBuying }] = useBuySSnMutation();

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (!data?.data) return;
    setSelectedRows(
      selectedRows.length === data.data.length
        ? []
        : data.data.map((row: SearchResult) => row._id)
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > data?.meta?.totalPage) return;
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleBuy = async (ssnId: string) => {
    try {
      const result = await buy({
        ssnId,
        userId: user?._id,
        price: 0.25,
      }).unwrap();
      await refetch();
      toast.success("Purchase successful!");
    } catch (error) {
      console.error("Buy failed:", error);
      alert("Failed to purchase. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Filters */}
      <Card className="flex-shrink-0 bg-gray-100shadow text-[#006bff] border-0">
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filter Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            <Input
              placeholder="First Name"
              value={filters.firstName}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />
            <Input
              placeholder="Last Name"
              value={filters.lastName}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, city: e.target.value }))
              }
            />
            <Select
              value={filters.state}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, state: value }))
              }
            >
              {" "}
              <SelectTrigger>
                {" "}
                <SelectValue placeholder="Select State" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                <SelectItem value="AL">Alabama</SelectItem>{" "}
                <SelectItem value="AK">Alaska</SelectItem>{" "}
                <SelectItem value="AZ">Arizona</SelectItem>{" "}
                <SelectItem value="AR">Arkansas</SelectItem>{" "}
                <SelectItem value="CA">California</SelectItem>{" "}
              </SelectContent>{" "}
            </Select>
            <Input
              placeholder="ZIP"
              value={filters.zipCode}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, zipCode: e.target.value }))
              }
            />

            <div className="flex gap-2">
              <Input
                placeholder="From year"
                value={filters.dateOfBirthFrom}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateOfBirthFrom: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="To year"
                value={filters.dateOfBirthTo}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateOfBirthTo: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex items-center gap-2 bg-[#006bff] hover:bg-[#0056cc] text-white"
              onClick={() => refetch()}
            >
              <Search size={16} />
              Search
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
      {isBuying && (
        <SpinnerOverlay message="Processing your purchase. Please wait..." />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Card className="flex-1 bg-gray-100shadow text-[#006bff] border-0">
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
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-[#006bff] text-white text-center">
                    <tr>
                      <th className=" p-2 font-medium text-base">Full Name</th>
                      <th className=" p-2 font-medium text-base">City</th>
                      <th className=" p-2 font-medium text-base">State</th>
                      <th className=" p-2 font-medium text-base">ZIP</th>
                      <th className=" p-2 font-medium text-base">Year</th>

                      <th className=" p-2 font-medium text-base">Country</th>
                      <th className=" p-2 font-medium text-base">Price</th>
                      <th className="text-right p-2 font-medium text-base">
                        Buy
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={10}
                          className="text-center py-4 text-sm text-gray-500"
                        >
                          No results found
                        </td>
                      </tr>
                    ) : (
                      data?.data?.map((row: SearchResult) => (
                        <tr
                          key={row._id}
                          className="hover:bg-[#e6f0ff] text-sm text-[#222] border-b text-center"
                        >
                          <td className="p-2  text-base ">
                            {row.firstName} {row.lastName}
                          </td>
                          <td className="p-2 text-base">{row.city}</td>
                          <td className="p-2 text-base">{row.state}</td>
                          <td className="p-2 text-base">{row.zipCode}</td>
                          <td className="p-2 text-base">{row.dateOfBirth}</td>
                          <td className="p-2 text-base">{"USA"}</td>
                          <td className="p-2  text-base">${0.25}</td>
                          <td className="p-2 text-right">
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

            {/* Pagination Controls */}
            {data?.meta && (
              <div className="flex justify-center gap-4 items-center mt-4 text-sm text-[#006bff]">
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  disabled={filters.page === 1}
                  onClick={() => handlePageChange(filters.page - 1)}
                >
                  <ChevronLeft size={16} /> Prev
                </Button>
                <span>
                  Page {data.meta.page} of {data.meta.totalPage}
                </span>
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  disabled={filters.page === data.meta.totalPage}
                  onClick={() => handlePageChange(filters.page + 1)}
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
