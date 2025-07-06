import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    id: "ORD-001",
    orderDate: "2024-07-06 10:30:00",
    fullName: "JOHN MATTHEW SMITH",
    ssn: "***-**-1234",
    dateOfBirth: "1985-03-15",
    city: "LOS ANGELES",
    state: "CA",
    zip: "90210",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    status: "completed",
    price: 0.25
  },
  {
    id: "ORD-002",
    orderDate: "2024-07-06 09:15:00",
    fullName: "MARIA ELENA RODRIGUEZ",
    ssn: "***-**-5678",
    dateOfBirth: "1990-08-22",
    city: "MIAMI",
    state: "FL",
    zip: "33101",
    phone: "(305) 987-6543",
    status: "completed",
    price: 0.25
  },
  {
    id: "ORD-003",
    orderDate: "2024-07-06 08:45:00",
    fullName: "ROBERT JAMES WILSON",
    ssn: "***-**-9012",
    dateOfBirth: "1978-12-03",
    city: "CHICAGO",
    state: "IL",
    zip: "60601",
    email: "r.wilson@email.com",
    status: "pending",
    price: 0.25
  },
  {
    id: "ORD-004",
    orderDate: "2024-07-05 16:20:00",
    fullName: "SARAH ELIZABETH DAVIS",
    ssn: "***-**-3456",
    dateOfBirth: "1992-05-18",
    city: "AUSTIN",
    state: "TX",
    zip: "73301",
    phone: "(512) 555-7890",
    email: "sarah.davis@email.com",
    status: "completed",
    price: 0.25
  },
  {
    id: "ORD-005",
    orderDate: "2024-07-05 14:10:00",
    fullName: "MICHAEL ANTHONY BROWN",
    ssn: "***-**-7890",
    dateOfBirth: "1983-11-07",
    city: "SEATTLE",
    state: "WA",
    zip: "98101",
    status: "failed",
    price: 0.25
  }
];

export function OrdersTable() {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Purchase Orders</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Filter by Date
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Order ID</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Full Name</th>
                  <th className="text-left p-3 font-medium">SSN</th>
                  <th className="text-left p-3 font-medium">DOB</th>
                  <th className="text-left p-3 font-medium">Location</th>
                  <th className="text-left p-3 font-medium">Contact</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Price</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono text-sm">{order.id}</td>
                    <td className="p-3 text-sm">{formatDate(order.orderDate)}</td>
                    <td className="p-3 font-medium">{order.fullName}</td>
                    <td className="p-3 font-mono">{order.ssn}</td>
                    <td className="p-3">{order.dateOfBirth}</td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{order.city}, {order.state}</div>
                        <div className="text-muted-foreground">{order.zip}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {order.phone && <div>{order.phone}</div>}
                        {order.email && <div className="text-muted-foreground">{order.email}</div>}
                        {!order.phone && !order.email && <span className="text-muted-foreground">No contact</span>}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-3 font-semibold">${order.price.toFixed(2)}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye size={14} />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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