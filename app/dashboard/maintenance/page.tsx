'use client';

import { Sidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { maintenanceRecords } from '@/lib/mock-data';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function MaintenancePage() {
  const [records, setRecords] = useState(maintenanceRecords);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    items: '',
    cost: '',
    notes: '',
  });

  const handleAdd = () => {
    if (formData.items && formData.date) {
      const newRecord = {
        id: String(Math.random()),
        ...formData,
        cost: parseInt(formData.cost) || 0,
      };
      setRecords([...records, newRecord]);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const handleEdit = (record: any) => {
    setEditingId(record.id);
    setFormData({
      date: record.date,
      items: record.items,
      cost: String(record.cost),
      notes: record.notes,
    });
  };

  const resetForm = () => {
    setFormData({
      date: '',
      items: '',
      cost: '',
      notes: '',
    });
    setEditingId(null);
  };

  const totalMaintenance = records.reduce((sum, r) => sum + r.cost, 0);
  const averageCost = records.length > 0 ? (totalMaintenance / records.length).toFixed(2) : 0;

  const handleExportPDF = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      const htmlContent = `
        <html>
          <head>
            <title>Maintenance Records Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { text-align: center; }
              .summary { margin: 20px 0; }
              .summary div { margin: 10px 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #5055d4; color: white; }
            </style>
          </head>
          <body>
            <h1>Maintenance Records Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <div class="summary">
              <div><strong>Total Maintenance Cost:</strong> $${totalMaintenance.toLocaleString()}</div>
              <div><strong>Average Cost per Record:</strong> $${averageCost}</div>
              <div><strong>Total Records:</strong> ${records.length}</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Items Used</th>
                  <th>Cost</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${records.map(record => `
                  <tr>
                    <td>${record.date}</td>
                    <td>${record.items}</td>
                    <td>$${record.cost.toLocaleString()}</td>
                    <td>${record.notes}</td>
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
            <h1 className="text-3xl font-bold">Maintenance Management</h1>
            <div className="flex gap-2">
              <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Record
                  </Button>
                </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Maintenance Record</DialogTitle>
                <DialogDescription>
                  Log a new maintenance activity or repair
                </DialogDescription>
              </DialogHeader>
                  <div className="space-y-4">
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
                      <Label htmlFor="items">Items Used *</Label>
                      <Input
                        id="items"
                        value={formData.items}
                        onChange={(e) => setFormData({...formData, items: e.target.value})}
                        placeholder="e.g., Roof repair materials, Paint, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="cost">Cost ($) *</Label>
                      <Input
                        id="cost"
                        type="number"
                        value={formData.cost}
                        onChange={(e) => setFormData({...formData, cost: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Any additional details..."
                      />
                    </div>
                    <Button onClick={handleAdd} className="w-full">Add Record</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalMaintenance.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${averageCost}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{records.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Items Used</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell className="font-medium">{record.items}</TableCell>
                        <TableCell>${record.cost.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{record.notes}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEdit(record)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => handleDelete(record.id)}>
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
                      <DialogTitle>Maintenance Record Details</DialogTitle>
                      <DialogDescription>
                        Complete information for this maintenance activity
                      </DialogDescription>
                    </DialogHeader>
                                <div className="space-y-2 text-sm">
                                  <p><strong>Date:</strong> {record.date}</p>
                                  <p><strong>Items Used:</strong> {record.items}</p>
                                  <p><strong>Cost:</strong> ${record.cost.toLocaleString()}</p>
                                  <p><strong>Notes:</strong> {record.notes}</p>
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
  );
}
