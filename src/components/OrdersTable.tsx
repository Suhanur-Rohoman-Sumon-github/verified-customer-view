import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Download, Calendar } from "lucide-react";

interface Order {
  id: string;
  orderDate: string;
  fullName: string;
  ssn: string;
  dateOfBirth: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  email?: string;
  status: "completed" | "pending" | "failed";
  price: number;
}

const mockOrders: Order[] = [
  {
    id: "105913",
    orderDate: "2025-06-07 16:22:26",
    fullName: "Averil Donald F",
    ssn: "556463371",
    dateOfBirth: "1938-09-01",
    city: "Yucaipa",
    state: "CA",
    zip: "923993413",
    phone: "N/A",
    email: "N/A",
    status: "completed",
    price: 0.25
  },
  {
    id: "58974",
    orderDate: "2025-26-02 20:08:25",
    fullName: "ANDREW NAVARRO",
    ssn: "526878243",
    dateOfBirth: "1967-04-09",
    city: "PHOENIX",
    state: "AZ",
    zip: "85004",
    phone: "6024883972",
    email: "andrewnavarro@cox.net",
    status: "completed",
    price: 0.25
  },
  {
    id: "72723",
    orderDate: "2025-26-02 18:11:09",
    fullName: "Alice Sgrignoli",
    ssn: "159066558",
    dateOfBirth: "1963-05-11",
    city: "Mechanicsburg",
    state: "PA",
    zip: "17050",
    phone: "7177126341",
    email: "scoresb@aol.com",
    status: "completed",
    price: 0.25
  },
  {
    id: "101026",
    orderDate: "2025-26-02 18:00:09",
    fullName: "ALICE BEAUMIER",
    ssn: "267435440",
    dateOfBirth: "1972-30-11",
    city: "saint petersburg",
    state: "FL",
    zip: "33716",
    phone: "7274799105",
    email: "ALICE@TVGOODS.COM",
    status: "completed",
    price: 0.25
  },
  {
    id: "93649",
    orderDate: "2025-26-02 17:49:58",
    fullName: "alice allen",
    ssn: "218864727",
    dateOfBirth: "1975-10-10",
    city: "wye mills",
    state: "MD",
    zip: "21679",
    phone: "4109242050",
    email: "afayeallen2@hotmail.com",
    status: "completed",
    price: 0.25
  },
  {
    id: "87086",
    orderDate: "2025-26-02 17:25:44",
    fullName: "karrie minteer",
    ssn: "176600759",
    dateOfBirth: "1979-13-10",
    city: "new castle",
    state: "PA",
    zip: "16101",
    phone: "7244980957",
    email: "karrieminteer@yahoo.com",
    status: "completed",
    price: 0.25
  },
  {
    id: "91232",
    orderDate: "2025-26-02 15:32:10",
    fullName: "ANTHONY ROBINSON",
    ssn: "492726431",
    dateOfBirth: "1963-31-01",
    city: "TOPEKA",
    state: "KS",
    zip: "66606",
    phone: "7852723227",
    email: "ANTHONY.ROBINSON1@VA.GOV",
    status: "completed",
    price: 0.25
  },
  {
    id: "145130",
    orderDate: "2025-05-02 13:58:10",
    fullName: "JOHN HOUSE",
    ssn: "556957650",
    dateOfBirth: "1971-03-07",
    city: "LOS ANGELES",
    state: "CA",
    zip: "90038",
    phone: "2133595037",
    email: "T.HOUSEMUSIC@GMAIL.COM",
    status: "completed",
    price: 0.25
  },
  {
    id: "128968",
    orderDate: "2025-21-01 06:34:06",
    fullName: "BRITTANY L QUICK",
    ssn: "253858018",
    dateOfBirth: "1992-26-08",
    city: "HEPHZIBAH",
    state: "GA",
    zip: "30815",
    phone: "N/A",
    email: "N/A",
    status: "completed",
    price: 0.25
  },
  {
    id: "133424",
    orderDate: "2025-21-01 06:28:59",
    fullName: "ELIZABETH SMITH",
    ssn: "258872221",
    dateOfBirth: "1993-12-04",
    city: "MILLEDGEVILLE",
    state: "GA",
    zip: "31061",
    phone: "N/A",
    email: "N/A",
    status: "completed",
    price: 0.25
  },
  {
    id: "127046",
    orderDate: "2025-21-01 06:22:26",
    fullName: "CHRISTOPHER C PRIESTER",
    ssn: "251778168",
    dateOfBirth: "1990-26-10",
    city: "KENNESAW",
    state: "GA",
    zip: "30152",
    phone: "N/A",
    email: "N/A",
    status: "completed",
    price: 0.25
  },
  {
    id: "152825",
    orderDate: "2025-19-01 09:57:12",
    fullName: "BRITTANY HARTWELL",
    ssn: "205705945",
    dateOfBirth: "1988-05-02",
    city: "PGH",
    state: "PA",
    zip: "15204",
    phone: "4127713635",
    email: "HARTWEB1@HOTMAIL.COM",
    status: "completed",
    price: 0.25
  },
  {
    id: "58580",
    orderDate: "2025-18-01 17:13:19",
    fullName: "TRINA DURBIN",
    ssn: "532877797",
    dateOfBirth: "1985-26-09",
    city: "RIVERSIDE",
    state: "CA",
    zip: "92509",
    phone: "9516837888",
    email: "gorgeousgirl182@hotmail.com",
    status: "completed",
    price: 0.25
  }
];

export function OrdersTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-yellow-500 text-yellow-900";
      case "failed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === mockOrders.length 
        ? [] 
        : mockOrders.map(order => order.id)
    );
  };

  const downloadSelectedData = () => {
    const selectedOrders = selectedRows.length > 0 
      ? mockOrders.filter(order => selectedRows.includes(order.id))
      : mockOrders;
    
    const csvContent = [
      // Header
      "ID,Date,Full Name,SSN,DOB,Address,City,State,ZIP,Phone,Email,Status,Cost",
      // Data rows
      ...selectedOrders.map(order => 
        `${order.id},"${formatDate(order.orderDate)}","${order.fullName}",${order.ssn},${order.dateOfBirth},"${order.city}, ${order.state}","${order.city}","${order.state}",${order.zip},"${order.phone}","${order.email}",${order.status},$${order.price.toFixed(2)}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Filter by Date
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={downloadSelectedData}
          >
            <Download size={16} className="mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Orders</span>
            <span className="text-sm font-normal text-muted-foreground">
              {selectedRows.length > 0 ? `${selectedRows.length} selected` : `${mockOrders.length} total`}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b">
                    <th className="text-left p-2">
                      <Checkbox 
                        checked={selectedRows.length === mockOrders.length && mockOrders.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-2 font-medium text-xs">ID</th>
                    <th className="text-left p-2 font-medium text-xs">SSN</th>
                    <th className="text-left p-2 font-medium text-xs">Full Name</th>
                    <th className="text-left p-2 font-medium text-xs">Address</th>
                    <th className="text-left p-2 font-medium text-xs">City</th>
                    <th className="text-left p-2 font-medium text-xs">State</th>
                    <th className="text-left p-2 font-medium text-xs">ZIP</th>
                    <th className="text-left p-2 font-medium text-xs">Phone</th>
                    <th className="text-left p-2 font-medium text-xs">E-mail</th>
                    <th className="text-left p-2 font-medium text-xs">DOB</th>
                    <th className="text-left p-2 font-medium text-xs">Country</th>
                    <th className="text-left p-2 font-medium text-xs">Cost</th>
                    <th className="text-left p-2 font-medium text-xs">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-muted/50 text-sm">
                      <td className="p-2">
                        <Checkbox 
                          checked={selectedRows.includes(order.id)}
                          onCheckedChange={() => handleRowSelect(order.id)}
                        />
                      </td>
                      <td className="p-2 font-mono text-xs">{order.id}</td>
                      <td className="p-2 font-mono text-xs">{order.ssn}</td>
                      <td className="p-2 font-medium text-xs">{order.fullName}</td>
                      <td className="p-2 text-xs">{order.city}, {order.state}</td>
                      <td className="p-2 text-xs">{order.city}</td>
                      <td className="p-2 text-xs">{order.state}</td>
                      <td className="p-2 text-xs">{order.zip}</td>
                      <td className="p-2 text-xs">{order.phone}</td>
                      <td className="p-2 text-xs">{order.email}</td>
                      <td className="p-2 text-xs">{order.dateOfBirth}</td>
                      <td className="p-2 text-xs">
                        <span className="inline-block w-6 h-4 bg-blue-500 rounded-sm"></span>
                      </td>
                      <td className="p-2 font-semibold text-xs">${order.price.toFixed(2)}</td>
                      <td className="p-2 text-xs">{formatDate(order.orderDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">5</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">3</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">1</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}