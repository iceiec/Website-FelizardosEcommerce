'use client';

import { Sidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { basketballCourts } from '@/lib/mock-data';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Calendar } from 'lucide-react';

export default function BasketballPage() {
  const [courts] = useState(basketballCourts);
  const [bookings, setBookings] = useState<Record<string, any[]>>(
    courts.reduce((acc, court) => {
      acc[court.id] = court.bookings;
      return acc;
    }, {} as Record<string, any[]>)
  );
  const [selectedCourt, setSelectedCourt] = useState<string>('andoy');
  const [courtFilter, setCourtFilter] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [formData, setFormData] = useState({
    date: '',
    slot: '',
    player: '',
    amount: '',
  });

  const handleBookSlot = () => {
    if (formData.date && formData.slot && formData.player && formData.amount && selectedCourt) {
      const newBooking = {
        date: formData.date,
        slot: formData.slot,
        booked: true,
        player: formData.player,
        amount: parseInt(formData.amount),
      };
      setBookings({
        ...bookings,
        [selectedCourt]: [...(bookings[selectedCourt] || []), newBooking],
      });
      setFormData({ date: '', slot: '', player: '', amount: '' });
    }
  };

  const getCourt = (courtId: string) => courts.find(c => c.id === courtId);

  const getFilteredCourts = () => {
    let filtered = courts;
    if (courtFilter !== 'All') {
      filtered = filtered.filter(c => c.id === courtFilter);
    }
    return filtered;
  };

  const getFilteredBookings = (courtId: string) => {
    let filtered = bookings[courtId] || [];
    
    // Filter by date if selected
    if (selectedDate) {
      filtered = filtered.filter(b => b.date === selectedDate);
    }
    
    // Filter by availability
    if (availabilityFilter === 'Taken') {
      filtered = filtered.filter(b => b.booked);
    } else if (availabilityFilter === 'Available') {
      filtered = filtered.filter(b => !b.booked);
    }
    return filtered;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Basketball Courts</h1>
            <p className="text-muted-foreground mt-2">Manage court bookings and availability</p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Label>Court:</Label>
              <Select value={courtFilter} onValueChange={setCourtFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Courts</SelectItem>
                  <SelectItem value="andoy">Andoy Court</SelectItem>
                  <SelectItem value="juliet">Juliet Court</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label>Availability:</Label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Slots</SelectItem>
                  <SelectItem value="Taken">Taken</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="date-filter">Filter by Date:</Label>
              <Input
                id="date-filter"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40"
              />
            </div>
          </div>

          {/* Courts Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getFilteredCourts().map((court) => (
              <Card key={court.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {court.name}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Book Slot
                        </Button>
                      </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book {court.name}</DialogTitle>
                    <DialogDescription>
                      Reserve a time slot at {court.name}
                    </DialogDescription>
                  </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="slot">Time Slot</Label>
                            <Select value={formData.slot} onValueChange={(value) => setFormData({ ...formData, slot: value })}>
                              <SelectTrigger id="slot">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {court.timeSlots.map((slot) => (
                                  <SelectItem key={slot} value={slot}>
                                    {slot}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="player">Player Name</Label>
                            <Input
                              id="player"
                              value={formData.player}
                              onChange={(e) => setFormData({ ...formData, player: e.target.value })}
                              placeholder="Enter player name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="amount">Payment Amount ($)</Label>
                            <Input
                              id="amount"
                              type="number"
                              value={formData.amount}
                              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                              placeholder="Enter amount"
                            />
                          </div>
                          <Button
                            onClick={() => {
                              setSelectedCourt(court.id);
                              handleBookSlot();
                            }}
                            className="w-full"
                          >
                            Confirm Booking
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Time Slots</h3>
                    <div className="space-y-2">
                      {court.timeSlots.map((slot) => {
                        const booking = bookings[court.id]?.find(
                          (b) => b.slot === slot && b.booked
                        );
                        const isBooked = !!booking;
                        return (
                          <div key={slot} className="flex items-center justify-between p-2 bg-secondary rounded">
                            <div>
                              <p className="font-medium">{slot}</p>
                              {(() => {
                                const booking = bookings[court.id]?.find(
                                  (b) => b.slot === slot && b.booked && (!selectedDate || b.date === selectedDate)
                                );
                                if (booking) {
                                  return (
                                    <p className="text-sm text-muted-foreground">
                                      {booking.player} - ${booking.amount}
                                    </p>
                                  );
                                }
                              })()}
                            </div>
                            <Badge variant={(() => {
                              const booking = bookings[court.id]?.find(
                                (b) => b.slot === slot && b.booked && (!selectedDate || b.date === selectedDate)
                              );
                              return booking ? 'destructive' : 'default';
                            })()}>
                              {(() => {
                                const booking = bookings[court.id]?.find(
                                  (b) => b.slot === slot && b.booked && (!selectedDate || b.date === selectedDate)
                                );
                                return booking ? 'Taken' : 'Available';
                              })()}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bookings Summary */}
                  {getFilteredBookings(court.id).length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Bookings {selectedDate ? `for ${selectedDate}` : ''}</h3>
                      <div className="space-y-2">
                        {getFilteredBookings(court.id).map((booking, idx) => (
                          <div key={idx} className="p-2 bg-muted rounded text-sm">
                            <p><strong>{booking.date}</strong> - {booking.slot}</p>
                            <p className="text-muted-foreground">{booking.player} - ${booking.amount}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
