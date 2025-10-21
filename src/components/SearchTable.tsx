/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useAddToCartMutation,
  useBuySSnMutation,
  useGetSSnsQuery,
} from "@/redux/fetures/ssns/ssn.api";
import { toast } from "sonner";
import Spinner from "./spinner/Spinner";
import SpinnerOverlay from "./spinner/SpinnerOverlay";
import { useLoadUserFromCookie } from "@/utils/useLoadUserFromCookie";

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
    base: "",
    country: "",
    email: "",
    phone: "",
    page: 1,
    limit: 14,
  });

  const user = useLoadUserFromCookie();
  const [buy, { isLoading: isBuying }] = useBuySSnMutation();
  const { data, isLoading, refetch } = useGetSSnsQuery(filters);



  // Reset selected rows whenever filters or data change
  useEffect(() => {
    setSelectedRows([]);
    refetch();
  }, [filters, refetch]);

  const updateFilter = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  // ✅ Toggle individual selection
  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // ✅ Toggle all selection
  const handleSelectAll = () => {
    if (selectedRows.length === data?.data?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data?.data?.map((row: SearchResult) => row._id) || []);
    }
  };

  // ✅ Buy single SSN
  const handleBuy = async (ssnId: string) => {
    try {
      await buy({
        ssnId,
        userId: user?._id,
        price: 0.25,
      }).unwrap();

      toast.success("Purchase successful!");

      // ✅ Small delay ensures server updates before refetch
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

  // ✅ Buy selected SSNs
  const handleBuySelected = async () => {
    if (selectedRows.length === 0) return toast.error("No rows selected.");
    try {
      for (const id of selectedRows) {
        await buy({
          ssnId: id,
          userId: user?._id,
          price: 0.25,
        }).unwrap();
      }
      toast.success("Selected SSNs purchased successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to purchase selected SSNs.");
    }
  };

  // ✅ Add selected SSNs to cart (placeholder)
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

  const handleAddToCart = async (ssnId?: string) => {
    const ssnIds = ssnId ? [ssnId] : selectedRows;

    if (ssnIds.length === 0) return toast.error("No rows selected.");

    if (!user?._id) return toast.error("User not logged in.");

    try {
      await addToCart({
        userId: user._id,
        ssnIds,
      }).unwrap();

      toast.success(`${ssnIds.length} SSN(s) added to cart.`);
    } catch (error: any) {
      console.error("Add to cart failed:", error);
      toast.error(
        error?.data?.message || "Failed to add to cart. Please try again."
      );
    }
  };

  // ✅ Handle pagination
  const handlePageChange = (newPage: number) => {
    if (!data?.meta) return;
    if (newPage < 1 || newPage > data.meta.totalPage) return;
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // ✅ Handle entries per page
  const handleEntriesChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  const validateText = (value: string) => value.replace(/[^a-zA-Z\s]/g, "");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => `${currentYear - i}`);

  return (
    <div className="space-y-6">
      {/* Filter Card */}{" "}
      <Card className="bg-gray-100 text-[#006bff] border-0">
        {" "}
        <CardHeader>
          {" "}
          <CardTitle>Filter</CardTitle>{" "}
        </CardHeader>{" "}
        <CardContent>
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            {" "}
            <Input
              placeholder="First Name"
              value={filters.firstName}
              onChange={(e) =>
                updateFilter("firstName", validateText(e.target.value))
              }
            />{" "}
            <Input
              placeholder="Last Name"
              value={filters.lastName}
              onChange={(e) =>
                updateFilter("lastName", validateText(e.target.value))
              }
            />{" "}
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) =>
                updateFilter("city", validateText(e.target.value))
              }
            />{" "}
            <Select
              value={filters.state}
              onValueChange={(value) => updateFilter("state", value)}
            >
              {" "}
              <SelectTrigger>
                {" "}
                <SelectValue placeholder="Select State" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
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
                    {" "}
                    {state}{" "}
                  </SelectItem>
                ))}{" "}
              </SelectContent>{" "}
            </Select>{" "}
            <Input
              placeholder="ZIP"
              value={filters.zipCode}
              onChange={(e) =>
                updateFilter("zipCode", e.target.value.replace(/[^0-9]/g, ""))
              }
            />{" "}
            <Select
              value={(filters as any).base || ""}
              onValueChange={(value) => updateFilter("base", value)}
            >
              {" "}
              <SelectTrigger className="w-[180px]">
                {" "}
                <SelectValue placeholder="Select Base" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                <SelectItem value="Any">Any</SelectItem>{" "}
                <SelectItem value="High Credit Score">
                  {" "}
                  High Credit Score{" "}
                </SelectItem>{" "}
                <SelectItem value="USA DL">USA DL</SelectItem>{" "}
                <SelectItem value="SSNMax premium">SSNMax Premium</SelectItem>{" "}
                <SelectItem value="SSN Max">SSN Max</SelectItem>{" "}
              </SelectContent>{" "}
            </Select>{" "}
            <div className="flex flex-col md:flex-row md:items-center gamd:gap-4 col-span-2">
              {" "}
              <div className="flex items-center gaw-full">
                {" "}
                <Select
                  value={filters.dateOfBirthFrom}
                  onValueChange={(value) =>
                    updateFilter("dateOfBirthFrom", value)
                  }
                >
                  {" "}
                  <SelectTrigger className="min-w-[160px] w-full md:w-[180px]">
                    {" "}
                    <SelectValue placeholder=" From" />{" "}
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {" "}
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {" "}
                        {year}{" "}
                      </SelectItem>
                    ))}{" "}
                  </SelectContent>{" "}
                </Select>{" "}
                <span className="text-[#006bff]">-</span>{" "}
                <Select
                  value={filters.dateOfBirthTo}
                  onValueChange={(value) =>
                    updateFilter("dateOfBirthTo", value)
                  }
                >
                  {" "}
                  <SelectTrigger className="min-w-[160px] w-full md:w-[180px]">
                    {" "}
                    <SelectValue placeholder=" To" />{" "}
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {" "}
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {" "}
                        {year}{" "}
                      </SelectItem>
                    ))}{" "}
                  </SelectContent>{" "}
                </Select>{" "}
              </div>{" "}
            </div>{" "}
            {/* 🔹 Select Base Dropdown */} {/* 🔹 Select Country Dropdown */}{" "}
            <Select
              value={(filters as any).country || ""}
              onValueChange={(value) => updateFilter("country", value)}
            >
              {" "}
              <SelectTrigger className="w-[180px]">
                {" "}
                <SelectValue placeholder="Select Country" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                <SelectItem value="USA">USA</SelectItem>{" "}
                <SelectItem value="Canada">Canada</SelectItem>{" "}
                <SelectItem value="UK">UK</SelectItem>{" "}
                <SelectItem value="Germany">Germany</SelectItem>{" "}
                <SelectItem value="Australia">Australia</SelectItem>{" "}
              </SelectContent>{" "}
            </Select>{" "}
            <Select
              value={(filters as any).email || ""}
              onValueChange={(value) => updateFilter("email", value)}
            >
              {" "}
              <SelectTrigger className="w-[140px]">
                {" "}
                <SelectValue placeholder="Email" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                <SelectItem value="Yes">Yes</SelectItem>{" "}
                <SelectItem value="No">No</SelectItem>{" "}
              </SelectContent>{" "}
            </Select>{" "}
            {/* 🔹 Phone (Yes / No) */}{" "}
            <Select
              value={(filters as any).phone || ""}
              onValueChange={(value) => updateFilter("phone", value)}
            >
              {" "}
              <SelectTrigger className="">
                {" "}
                <SelectValue placeholder="Phone" />{" "}
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                <SelectItem value="Yes">Yes</SelectItem>{" "}
                <SelectItem value="No">No</SelectItem>{" "}
              </SelectContent>{" "}
            </Select>{" "}
            <Select
              value={(filters as any).price || ""}
              onValueChange={(value) => updateFilter("price", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fromHigher">From Higher</SelectItem>
                <SelectItem value="fromLower">From Lower</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
          <div className="flex gap-4">
            {" "}
            <Button
              className="flex items-center bg-[#006bff] hover:bg-[#0056cc] text-white"
              onClick={() => refetch()}
            >
              {" "}
              <Search size={16} /> Search{" "}
            </Button>{" "}
            <Button
              variant="outline"
              className="border-[#006bff]  hover:bg-[#006bff]/10"
              onClick={() =>
                setFilters({
                  firstName: "",
                  lastName: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  dateOfBirthFrom: "",
                  dateOfBirthTo: "",
                  base: "",
                  country: "",
                  email: "",
                  phone: "",
                  page: 1,
                  limit: 14,
                })
              }
            >
              {" "}
              Clear{" "}
            </Button>{" "}
          </div>{" "}
        </CardContent>{" "}
      </Card>
      {/* --- Search Results --- */}
      {isBuying && <SpinnerOverlay message="Processing your purchase..." />}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Card className="flex-1 bg-gray-100 text-[#1f2937] border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm font-normal ">
                {selectedRows.length > 0
                  ? `${selectedRows.length} selected`
                  : `${data?.meta?.total ?? 0} total`}
              </span>
            </CardTitle>
            <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  className="bg-[#006bff] hover:bg-[#0056cc] text-white"
                  onClick={() => handleAddToCart()}
                  disabled={selectedRows.length === 0}
                >
                  <ShoppingCart size={16} />
                  Add to Cart Selected
                </Button>

                <Button
                  className="border-[#0056cc] hover:bg-[#0056cc] text-white"
                  onClick={() => handleBuySelected()}
                  disabled={selectedRows.length === 0}
                >
                  <ShoppingCart size={16} />
                  Buy Selected
                </Button>
              </div>

              {/* Entries per page */}
              <div className="flex items-center gatext-[#006bff]">
                <span>Entries per page:</span>
                <Select
                  value={String(filters.limit)}
                  onValueChange={(value) => handleEntriesChange(Number(value))}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="14" />
                  </SelectTrigger>
                  <SelectContent>
                    {[14, 25, 50, 100].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center">
                  <thead className="sticky top-0 bg-[#006bff] text-white">
                    <tr>
                      <th className="cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            selectedRows.length === data?.data?.length &&
                            data?.data?.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th className="py-1">Full Name</th>
                      <th className="">City</th>
                      <th className="">State</th>
                      <th className="">ZIP</th>
                      <th className="">DOB</th>
                      <th className="">Country</th>
                      <th className="">Price</th>
                      <th className="">Add to Cart</th>
                      <th className="">Buy</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.data?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="text-center py-4 text-gray-500"
                        >
                          No results found
                        </td>
                      </tr>
                    ) : (
                      data?.data?.map((row: SearchResult) => (
                        <tr
                          key={row._id}
                          className="hover:bg-[#e6f0ff] border-b text-center uppercase"
                        >
                          <td className="cursor-pointer">
                            <input
                              className="cursor-pointer"
                              type="checkbox"
                              checked={selectedRows.includes(row._id)}
                              onChange={() => handleRowSelect(row._id)}
                            />
                          </td>
                          <td className="py-2">
                            {row.firstName?.charAt(0).toUpperCase() +
                              row.firstName?.slice(1)}{" "}
                            {row.lastName?.charAt(0).toUpperCase() +
                              row.lastName?.slice(1)}
                          </td>
                          <td className="uppercase">
                            {row.city?.charAt(0).toUpperCase() +
                              row.city?.slice(1)}
                          </td>
                          <td className="">{row.state}</td>
                          <td className="">{row.zipCode}</td>
                          <td className="">{row.dateOfBirth}</td>
                          <td className="">{row.country || "USA"}</td>
                          <td className="">${row.price || 0.25}</td>
                          <td className="">
                            <Button
                              size="sm"
                              className="bg-[#006bff] hover:bg-[#0056cc] text-white"
                              onClick={() => handleAddToCart(row._id)}
                            >
                              <ShoppingCart size={16} />
                            </Button>
                          </td>
                          <td className="">
                            <Button
                              size="sm"
                              className="bg-[#006bff] hover:bg-[#0056cc] text-white"
                              onClick={() => handleBuy(row._id)}
                            >
                              <ShoppingCart size={16} />
                              Buy Now
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </ScrollArea>

            {/* --- Actions Section --- */}

            {/* --- Pagination --- */}
            {data?.meta && (
              <div className="flex justify-center items-center pt-4 gap-2 text-sm text-[#006bff]">
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
