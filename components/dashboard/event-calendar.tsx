'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  events?: Array<{ date: string; title: string; time?: string }>;
  title?: string;
}

export function EventCalendar({ events = [], title = 'Schedule Calendar' }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 3, 1)); // April 2024

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getEventsForDate = (day: number) => {
    const dateStr = `2024-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-center font-semibold text-lg min-w-40">{monthName}</h3>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="rounded-lg border overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-0 border-b bg-secondary">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center text-sm font-semibold border-r last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-0">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="p-3 bg-muted/30 border-b border-r last:border-r-0" />
              ))}
              {days.map(day => {
                const dayEvents = getEventsForDate(day);
                return (
                  <div
                    key={day}
                    className="min-h-20 p-2 border-b border-r last:border-r-0 hover:bg-accent/50 transition"
                  >
                    <div className="font-semibold text-sm mb-1">{day}</div>
                    <div className="space-y-1">
                      {dayEvents.map((event, idx) => (
                        <div key={idx} className="text-xs bg-primary/20 text-primary rounded px-1 py-0.5 truncate">
                          {event.time && <span>{event.time} - </span>}
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
