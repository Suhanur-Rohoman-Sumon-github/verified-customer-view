import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
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
    country: "US"
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
    country: "US"
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
    country: "US"
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
    country: "US"
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
    country: "US"
  }
];

export function SearchTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchResults] = useState<SearchResult[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  
  const [filters, setFilters] = useState({
    fullName: "",
    ageFrom: "",
    ageTo: "",
    yearFrom: "",
    yearTo: "",
    city: "",
    zip: "",
    state: "",
    withEmail: false,
    withPhone: false,
    withZip: false
  });

  // Calculate pagination
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = searchResults.slice(startIndex, endIndex);

  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === currentResults.length 
        ? [] 
        : currentResults.map(row => row.id)
    );
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <Card className="flex-shrink-0">
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Full Name"
              value={filters.fullName}
              onChange={(e) => setFilters(prev => ({ ...prev, fullName: e.target.value }))}
            />
            <Input
              placeholder="Age from"
              value={filters.ageFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, ageFrom: e.target.value }))}
            />
            <Input
              placeholder="Year from"
              value={filters.yearFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, yearFrom: e.target.value }))}
            />
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="ZIP"
              value={filters.zip}
              onChange={(e) => setFilters(prev => ({ ...prev, zip: e.target.value }))}
            />
            <Input
              placeholder="Age to"
              value={filters.ageTo}
              onChange={(e) => setFilters(prev => ({ ...prev, ageTo: e.target.value }))}
            />
            <Input
              placeholder="Year to"
              value={filters.yearTo}
              onChange={(e) => setFilters(prev => ({ ...prev, yearTo: e.target.value }))}
            />
            <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="OR">Oregon</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="withEmail"
                checked={filters.withEmail}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, withEmail: !!checked }))}
              />
              <label htmlFor="withEmail" className="text-sm font-medium">With Email</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="withPhone"
                checked={filters.withPhone}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, withPhone: !!checked }))}
              />
              <label htmlFor="withPhone" className="text-sm font-medium">With Phone</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="withZip"
                checked={filters.withZip}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, withZip: !!checked }))}
              />
              <label htmlFor="withZip" className="text-sm font-medium">With Zip</label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex items-center gap-2">
              <Search size={16} />
              Search
            </Button>
            <Button variant="outline">Clear</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
          <CardTitle>Search Results</CardTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="25">
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">Any</Button>
            <Button className="bg-success hover:bg-success/90">Buy Selected</Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">
                      <Checkbox 
                        checked={selectedRows.length === currentResults.length && currentResults.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-3 font-medium">Full Name</th>
                    <th className="text-left p-3 font-medium">City</th>
                    <th className="text-left p-3 font-medium">State</th>
                    <th className="text-left p-3 font-medium">ZIP</th>
                    <th className="text-left p-3 font-medium">Year</th>
                    <th className="text-left p-3 font-medium">Phone</th>
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Country</th>
                    <th className="text-left p-3 font-medium">Price</th>
                    <th className="text-left p-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentResults.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <Checkbox 
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => handleRowSelect(row.id)}
                        />
                      </td>
                      <td className="p-3 font-medium">{row.fullName}</td>
                      <td className="p-3">{row.city}</td>
                      <td className="p-3">{row.state}</td>
                      <td className="p-3">{row.zip}</td>
                      <td className="p-3">{row.year}</td>
                      <td className="p-3">
                        {row.hasPhone ? "✓" : <X size={16} className="text-destructive" />}
                      </td>
                      <td className="p-3">
                        {row.hasEmail ? "✓" : <X size={16} className="text-destructive" />}
                      </td>
                      <td className="p-3">
                        <span className="inline-block w-6 h-4 bg-blue-500 rounded-sm"></span>
                      </td>
                      <td className="p-3 text-destructive font-semibold">${row.price.toFixed(2)}</td>
                      <td className="p-3">
                        <Button size="sm" className="bg-success hover:bg-success/90">
                          Buy
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
          
          <div className="flex-shrink-0 mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}