// Pavilion Events
export const pavilionEvents = [
  {
    id: '1',
    date: '2024-04-15',
    time: '10:00 AM',
    endTime: '2:00 PM',
    eventName: 'Corporate Retreat',
    client: 'Acme Corporation',
    status: 'Confirmed',
    capacity: 50,
    amount: 1500,
    deposit: 500,
    notes: 'Requires catering setup'
  },
  {
    id: '2',
    date: '2024-04-20',
    time: '2:00 PM',
    endTime: '10:00 PM',
    eventName: 'Wedding Ceremony',
    client: 'Sarah & John',
    status: 'Confirmed',
    capacity: 100,
    amount: 3000,
    deposit: 1500,
    notes: 'Outdoor seating preferred'
  },
  {
    id: '3',
    date: '2024-05-10',
    time: '6:00 PM',
    endTime: '9:00 PM',
    eventName: 'Birthday Party',
    client: 'Mike Johnson',
    status: 'Pending',
    capacity: 30,
    amount: 500,
    deposit: 250,
    notes: 'Decorations provided by client'
  },
  {
    id: '4',
    date: '2024-05-22',
    time: '11:00 AM',
    endTime: '6:00 PM',
    eventName: 'Community Fundraiser',
    client: 'Local Charity',
    status: 'Confirmed',
    capacity: 200,
    amount: 2500,
    deposit: 1000,
    notes: 'Setup required 2 days prior'
  },
];

// Pool Events
export const poolEvents = [
  {
    id: '1',
    date: '2024-04-16',
    time: '9:00 AM',
    endTime: '12:00 PM',
    eventName: 'Swimming Classes',
    client: 'Youth Center',
    status: 'Confirmed',
    capacity: 20,
    amount: 800,
    deposit: 400,
    notes: 'Lifeguard required'
  },
  {
    id: '2',
    date: '2024-04-25',
    time: '1:00 PM',
    endTime: '6:00 PM',
    eventName: 'Pool Party',
    client: 'Madison High School',
    status: 'Confirmed',
    capacity: 150,
    amount: 2000,
    deposit: 1000,
    notes: 'DJ and sound system included'
  },
  {
    id: '3',
    date: '2024-05-05',
    time: '3:00 PM',
    endTime: '5:00 PM',
    eventName: 'Aqua Fitness',
    client: 'Fitness Club',
    status: 'Pending',
    capacity: 40,
    amount: 600,
    deposit: 300,
    notes: 'Equipment rental needed'
  },
];

// Maintenance Records
export const maintenanceRecords = [
  {
    id: '1',
    date: '2024-03-10',
    items: 'Pavilion roof repair',
    cost: 450,
    notes: 'Fixed leaking tiles'
  },
  {
    id: '2',
    date: '2024-03-15',
    items: 'Pool filter replacement',
    cost: 350,
    notes: 'Old filter no longer effective'
  },
  {
    id: '3',
    date: '2024-03-20',
    items: 'Lighting system upgrade',
    cost: 1200,
    notes: 'Installed LED lighting in pavilion'
  },
  {
    id: '4',
    date: '2024-03-25',
    items: 'Pool deck cleaning',
    cost: 150,
    notes: 'Deep cleaning and sealing'
  },
];

// Monthly Revenue Data
export const monthlyRevenue = [
  { month: 'Jan', pavilion: 2400, pool: 1800 },
  { month: 'Feb', pavilion: 2100, pool: 2000 },
  { month: 'Mar', pavilion: 3200, pool: 2400 },
  { month: 'Apr', pavilion: 2800, pool: 2600 },
  { month: 'May', pavilion: 3500, pool: 3100 },
];

// Monthly Events Data
export const monthlyEvents = [
  { month: 'Jan', events: 8 },
  { month: 'Feb', events: 6 },
  { month: 'Mar', events: 10 },
  { month: 'Apr', events: 9 },
  { month: 'May', events: 12 },
];

// Basketball Courts
export const basketballCourts = [
  {
    id: 'andoy',
    name: 'Andoy Court',
    timeSlots: ['5pm-7pm', '7pm-9pm', '9pm-11pm'],
    bookings: [
      { date: '2024-04-15', slot: '5pm-7pm', booked: true, player: 'John', amount: 100 },
      { date: '2024-04-15', slot: '7pm-9pm', booked: false },
      { date: '2024-04-16', slot: '9pm-11pm', booked: true, player: 'Mike', amount: 100 },
      { date: '2024-04-17', slot: '5pm-7pm', booked: true, player: 'James', amount: 100 },
      { date: '2024-04-18', slot: '7pm-9pm', booked: false },
    ]
  },
  {
    id: 'juliet',
    name: 'Juliet Court',
    timeSlots: ['4pm-6pm', '6pm-8pm', '8pm-10pm', '10pm-12pm'],
    bookings: [
      { date: '2024-04-15', slot: '4pm-6pm', booked: true, player: 'Sarah', amount: 120 },
      { date: '2024-04-15', slot: '6pm-8pm', booked: false },
      { date: '2024-04-16', slot: '8pm-10pm', booked: true, player: 'Alex', amount: 120 },
      { date: '2024-04-17', slot: '10pm-12pm', booked: false },
      { date: '2024-04-18', slot: '4pm-6pm', booked: true, player: 'Emma', amount: 120 },
    ]
  }
];

// Sign-In Records (Personal Tracker)
export const signInRecords = [
  { id: '1', date: '2024-04-01', name: 'John Doe', facility: 'Pavilion', time: '10:00 AM', checkOut: '12:00 PM' },
  { id: '2', date: '2024-04-01', name: 'Sarah Smith', facility: 'Pool', time: '9:30 AM', checkOut: '11:00 AM' },
  { id: '3', date: '2024-04-02', name: 'Mike Johnson', facility: 'Basketball - Andoy', time: '5:00 PM', checkOut: '7:00 PM' },
  { id: '4', date: '2024-04-02', name: 'Alex Chen', facility: 'Basketball - Juliet', time: '4:00 PM', checkOut: '6:00 PM' },
  { id: '5', date: '2024-04-03', name: 'Jane Doe', facility: 'Pavilion', time: '11:00 AM', checkOut: '1:00 PM' },
];
