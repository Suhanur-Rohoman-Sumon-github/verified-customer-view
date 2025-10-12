import { useState } from "react";
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

interface SearchResult {
  id: string;
  fullName: string;
  city: string;
  state: string;
  zipecode: string;
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
    fullName: "",
    city: "",
    state: "",
    zip: "",
    dobFrom: "",
    dobTo: "",
    page: 1,
    limit: 10,
  });

  const user = useCurrentUser();



  // Fetch data with pagination
  const { data, error, isLoading, refetch } = useGetSSnsQuery(filters);
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
        : data.data.map((row: SearchResult) => row.id)
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > data?.meta?.totalPage) return;
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleBuy = (ssnId: string) => {
    alert(`Buying SSN with ID: ${ssnId}`);
    buy({ ssnId, userId: user?._id, price: 0.25 });
    refetch();
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Full Name"
              value={filters.fullName}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, fullName: e.target.value }))
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
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AL">Alabama</SelectItem>
                <SelectItem value="AK">Alaska</SelectItem>
                <SelectItem value="AZ">Arizona</SelectItem>
                <SelectItem value="AR">Arkansas</SelectItem>
                <SelectItem value="CA">California</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="ZIP"
              value={filters.zip}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, zip: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="From year"
                value={filters.dobFrom}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dobFrom: e.target.value }))
                }
              />
              <p className="flex items-center justify-center">-</p>
              <Input
                placeholder="To year"
                value={filters.dobTo}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dobTo: e.target.value }))
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
                  fullName: "",
                  city: "",
                  state: "",
                  zip: "",
                  dobFrom: "",
                  dobTo: "",
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
                <thead className="sticky top-0 bg-[#006bff] text-white">
                  <tr>
                    <th className="text-left p-2">
                      <Checkbox
                        checked={
                          selectedRows.length === data?.data?.length &&
                          data?.data?.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-2 font-medium text-xs">
                      Full Name
                    </th>
                    <th className="text-left p-2 font-medium text-xs">City</th>
                    <th className="text-left p-2 font-medium text-xs">State</th>
                    <th className="text-left p-2 font-medium text-xs">ZIP</th>
                    <th className="text-left p-2 font-medium text-xs">Year</th>
                    <th className="text-left p-2 font-medium text-xs">Phone</th>
                    <th className="text-left p-2 font-medium text-xs">Email</th>
                    <th className="text-left p-2 font-medium text-xs">
                      Country
                    </th>
                    <th className="text-left p-2 font-medium text-xs">Price</th>
                    <th className="text-right p-2 font-medium text-xs">Buy</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((row: SearchResult) => (
                    <tr
                      key={row.id}
                      className="hover:bg-[#e6f0ff] text-sm text-[#222]"
                    >
                      <td className="p-2">
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => handleRowSelect(row.id)}
                        />
                      </td>
                      <td className="p-2 font-medium text-xs">
                        {row.fullName}
                      </td>
                      <td className="p-2 text-xs">{row.city}</td>
                      <td className="p-2 text-xs">{row.state}</td>
                      <td className="p-2 text-xs">{row.zipecode}</td>
                      <td className="p-2 text-xs">{row.year}</td>
                      <td className="p-2 text-xs">
                        {row.hasPhone ? (
                          "✓"
                        ) : (
                          <X size={16} className="text-destructive" />
                        )}
                      </td>
                      <td className="p-2 text-xs">
                        {row.hasEmail ? (
                          "✓"
                        ) : (
                          <X size={16} className="text-destructive" />
                        )}
                      </td>
                      <td className="p-2 text-xs">{row.country}</td>
                      <td className="p-2 font-semibold text-xs">${0.25}</td>
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
                  ))}
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
    </div>
  );
}
