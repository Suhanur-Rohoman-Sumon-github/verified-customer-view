import { useState } from "react";
import { Search, X, ShoppingCart } from "lucide-react";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SearchResult {
  id: string;
  fullName: string;
  city: string;
  state: string;
  zip: string;
  year: number;
  price: number;
  hasPhone: boolean;
  hasEmail: boolean;
  country: string;
}

const mockData: SearchResult[] = [
  {
    id: "1",
    fullName: "AUBUCHON DE LYONS J",
    city: "WOFFORD HEIGHTS",
    state: "CA",
    zip: "932854034",
    year: 1925,
    price: 0.25,
    hasPhone: false,
    hasEmail: false,
    country: "US",
  },
  {
    id: "2",
    fullName: "ATTWATER JRDONALD E",
    city: "WINSTON",
    state: "OR",
    zip: "974960910",
    year: 1948,
    price: 0.25,
    hasPhone: false,
    hasEmail: false,
    country: "US",
  },
  {
    id: "3",
    fullName: "BACKES PETER L",
    city: "WHITTIER",
    state: "CA",
    zip: "906033152",
    year: 1927,
    price: 0.25,
    hasPhone: false,
    hasEmail: false,
    country: "US",
  },
  {
    id: "4",
    fullName: "ASIS CONRADO A",
    city: "WESTMINSTER",
    state: "CA",
    zip: "926834026",
    year: 1939,
    price: 0.25,
    hasPhone: false,
    hasEmail: false,
    country: "US",
  },
  {
    id: "5",
    fullName: "ASIS CRESENCIA O",
    city: "WESTMINSTER",
    state: "CA",
    zip: "926834026",
    year: 1943,
    price: 0.25,
    hasPhone: false,
    hasEmail: false,
    country: "US",
  },
];

export function SearchTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchResults] = useState<SearchResult[]>(mockData);
  const [filters, setFilters] = useState({
    fullName: "",
    city: "",
    state: "",
    zip: "",
    year: "",
    withEmail: false,
    withPhone: false,
  });

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === searchResults.length
        ? []
        : searchResults.map((row) => row.id)
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Options */}
      <Card className="flex-shrink-0 bg-gray-100shadow text-[#006bff] border-0">
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Full Name"
              value={filters.fullName}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
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
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="AL">Alabama</SelectItem>
                <SelectItem value="AK">Alaska</SelectItem>
                <SelectItem value="AZ">Arizona</SelectItem>
                <SelectItem value="AR">Arkansas</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="CO">Colorado</SelectItem>
                <SelectItem value="CT">Connecticut</SelectItem>
                <SelectItem value="DE">Delaware</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
                <SelectItem value="GA">Georgia</SelectItem>
                <SelectItem value="HI">Hawaii</SelectItem>
                <SelectItem value="ID">Idaho</SelectItem>
                <SelectItem value="IL">Illinois</SelectItem>
                <SelectItem value="IN">Indiana</SelectItem>
                <SelectItem value="IA">Iowa</SelectItem>
                <SelectItem value="KS">Kansas</SelectItem>
                <SelectItem value="KY">Kentucky</SelectItem>
                <SelectItem value="LA">Louisiana</SelectItem>
                <SelectItem value="ME">Maine</SelectItem>
                <SelectItem value="MD">Maryland</SelectItem>
                <SelectItem value="MA">Massachusetts</SelectItem>
                <SelectItem value="MI">Michigan</SelectItem>
                <SelectItem value="MN">Minnesota</SelectItem>
                <SelectItem value="MS">Mississippi</SelectItem>
                <SelectItem value="MO">Missouri</SelectItem>
                <SelectItem value="MT">Montana</SelectItem>
                <SelectItem value="NE">Nebraska</SelectItem>
                <SelectItem value="NV">Nevada</SelectItem>
                <SelectItem value="NH">New Hampshire</SelectItem>
                <SelectItem value="NJ">New Jersey</SelectItem>
                <SelectItem value="NM">New Mexico</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
                <SelectItem value="NC">North Carolina</SelectItem>
                <SelectItem value="ND">North Dakota</SelectItem>
                <SelectItem value="OH">Ohio</SelectItem>
                <SelectItem value="OK">Oklahoma</SelectItem>
                <SelectItem value="OR">Oregon</SelectItem>
                <SelectItem value="PA">Pennsylvania</SelectItem>
                <SelectItem value="RI">Rhode Island</SelectItem>
                <SelectItem value="SC">South Carolina</SelectItem>
                <SelectItem value="SD">South Dakota</SelectItem>
                <SelectItem value="TN">Tennessee</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="UT">Utah</SelectItem>
                <SelectItem value="VT">Vermont</SelectItem>
                <SelectItem value="VA">Virginia</SelectItem>
                <SelectItem value="WA">Washington</SelectItem>
                <SelectItem value="WV">West Virginia</SelectItem>
                <SelectItem value="WI">Wisconsin</SelectItem>
                <SelectItem value="WY">Wyoming</SelectItem>
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
            <div className="flex flex-col">
              <div className="flex gap-2">
                <Input
                  placeholder="from year"
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, dobFrom: e.target.value }))
                  }
                />
                <p className="flex items-center justify-center">-</p>
                <Input
                  placeholder="to year"
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, dobTo: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex items-center gap-2 bg-[#006bff] hover:bg-[#0056cc] text-white">
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
                  year: "",
                  withEmail: false,
                  withPhone: false,
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
                : `${searchResults.length} total`}
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
                          selectedRows.length === searchResults.length &&
                          searchResults.length > 0
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
                  {searchResults.map((row) => (
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
                      <td className="p-2 text-xs">{row.zip}</td>
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
                      <td className="p-2 font-semibold text-xs">
                        ${row.price.toFixed(2)}
                      </td>
                      <td className="p-2 text-right">
                        <Button
                          size="sm"
                          className="bg-[#006bff] hover:bg-[#0056cc] text-white"
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
        </CardContent>
      </Card>
    </div>
  );
}
