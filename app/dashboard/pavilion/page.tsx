'use client';


import { Sidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { pavilionEvents } from '@/lib/mock-data';
import { EventCalendar } from '@/components/dashboard/event-calendar';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function PavilionPage() {
  const [events, setEvents] = useState(pavilionEvents);
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    endTime: '',
    eventName: '',
    client: '',
    status: 'Pending',
    capacity: '',
    amount: '',
    deposit: '',
    notes: '',
  });

  const filteredEvents = statusFilter === 'All' ? events : events.filter(e => e.status === statusFilter);

  const handleAdd = () => {
    if (formData.eventName && formData.date) {
      if (editingId) {
        // Update existing event
        setEvents(events.map(e => e.id === editingId ? {
          ...e,
          ...formData,
          capacity: parseInt(formData.capacity) || 0,
          amount: parseInt(formData.amount) || 0,
          deposit: parseInt(formData.deposit) || 0,
        } : e));
      } else {
        // Add new event
        const newEvent = {
          id: String(Math.random()),
          ...formData,
          capacity: parseInt(formData.capacity) || 0,
          amount: parseInt(formData.amount) || 0,
          deposit: parseInt(formData.deposit) || 0,
        };
        setEvents([...events, newEvent]);
      }
      resetForm();
      setDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleEdit = (event: any) => {
    setEditingId(event.id);
    setFormData({
      date: event.date,
      time: event.time,
      endTime: event.endTime,
      eventName: event.eventName,
      client: event.client,
      status: event.status,
      capacity: String(event.capacity),
      amount: String(event.amount),
      deposit: String(event.deposit),
      notes: event.notes,
    });
    setDialogOpen(true);
  };

  
  const resetForm = () => {
    setFormData({
      date: '',
      time: '',
      endTime: '',
      eventName: '',
      client: '',
      status: 'Pending',
      capacity: '',
      amount: '',
      deposit: '',
      notes: '',
    });
    setEditingId(null);
  };

  async function loadEvents() {
    const res = await fetch("/api/pavillion");
    if (!res.ok) throw new Error ("Failed to load events.");
    const data = await res.json();
    setEvents(data);
    }

    useEffect(() => {
      loadEvents();
    }, []);
  
  async function handleUpdate() {
  if (!editingId) return;

  const res = await fetch("/api/pavillion", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: editingId,
      ...formData,
    }),
  });

  if (!res.ok) {
    console.error("Failed to update event");
    return;
  }

  const updated = await res.json();

  setEvents((prev) =>
    prev.map((event) => (event.id === updated.id ? updated : event))
  );

  resetForm();
  setDialogOpen(false);
}



  const handleExportPDF = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      const htmlContent = `
        <html>
          <head>
            <title>Pavilion Events Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #5055d4; color: white; }
              .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
              .confirmed { background-color: #dcfce7; color: #166534; }
              .pending { background-color: #fef3c7; color: #92400e; }
            </style>
          </head>
          <body>
            <h1>Pavilion Events Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Event Name</th>
                  <th>Client</th>
                  <th>Capacity</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${events.map(event => `
                  <tr>
                    <td>${event.date}</td>
                    <td>${event.time}</td>
                    <td>${event.eventName}</td>
                    <td>${event.client}</td>
                    <td>${event.capacity}</td>
                    <td>$${event.amount}</td>
                    <td><span class="status ${event.status.toLowerCase()}">${event.status}</span></td>
                    <td>${event.notes}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Pavilion Management</h1>
            <div className="flex gap-2">
              <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Schedule Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingId ? 'Edit Event' : 'Schedule Pavilion Event'}</DialogTitle>
                    <DialogDescription>
                      {editingId ? 'Update the event details below' : 'Enter the event details to schedule your pavilion event'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="eventName">Event Name *</Label>
                      <Input
                        id="eventName"
                        value={formData.eventName}
                        onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Start Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="client">Client Name</Label>
                      <Input
                        id="client"
                        value={formData.client}
                        onChange={(e) => setFormData({...formData, client: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Total Payment Amount ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deposit">Deposit Amount ($)</Label>
                      <Input
                        id="deposit"
                        type="number"
                        value={formData.deposit}
                        onChange={(e) => setFormData({...formData, deposit: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                        <SelectTrigger id="status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleAdd} className="w-full">{editingId ? 'Update Event' : 'Add Event'}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Calendar and Table Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Calendar on the left */}
            <div className="lg:col-span-1">
              <EventCalendar 
                events={filteredEvents.map(e => ({ date: e.date, title: e.eventName, time: e.time }))} 
                title="Pavilion Schedule"
              />
            </div>

            {/* Events Table on the right */}
            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Scheduled Events</CardTitle>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Events</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Deposit</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>{event.time} - {event.endTime}</TableCell>
                            <TableCell className="font-medium">{event.eventName}</TableCell>
                            <TableCell>{event.client}</TableCell>
                            <TableCell>{event.capacity}</TableCell>
                            <TableCell className="font-semibold">${event.amount}</TableCell>
                            <TableCell className="font-semibold">${event.deposit}</TableCell>
                            <TableCell>
                              <Badge variant={event.status === 'Confirmed' ? 'default' : event.status === 'Pending' ? 'secondary' : 'destructive'}>
                                {event.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEdit(event)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => handleDelete(event.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Event Details - {event.eventName}</DialogTitle>
                                      <DialogDescription>
                                        Complete information for this event booking
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Date:</strong> {event.date}</p>
                                      <p><strong>Time:</strong> {event.time} - {event.endTime}</p>
                                      <p><strong>Client:</strong> {event.client}</p>
                                      <p><strong>Capacity:</strong> {event.capacity}</p>
                                      <p><strong>Total Amount:</strong> ${event.amount}</p>
                                      <p><strong>Deposit Amount:</strong> ${event.deposit}</p>
                                      <p><strong>Balance Due:</strong> ${event.amount - event.deposit}</p>
                                      <p><strong>Status:</strong> {event.status}</p>
                                      <p><strong>Notes:</strong> {event.notes}</p>
                                      <Button onClick={() => window.print()} className="w-full mt-4">Print/Export PDF</Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
