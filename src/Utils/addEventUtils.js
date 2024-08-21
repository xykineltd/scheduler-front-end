import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

// Function to generate random events for a specific month
export const generateRandomEventsForMonth = (year, month, numberOfEvents = 4) => {
    const startDate = startOfMonth(new Date(year, month));
    const endDate = endOfMonth(new Date(year, month));

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const events = [];

    // Random event names
    const eventNames = [
        "Jenny's Birthday",
        "Meeting with the Team",
        "Tea Time",
        "Flight to Catch",
        "Project Deadline",
        "Anniversary Celebration",
        "Doctor's Appointment",
        "Workshops"
    ];

    const randomDays = days.sort(() => 0.5 - Math.random()).slice(0, numberOfEvents);

    randomDays.forEach((randomDate, index) => {
        const event = {
            id: index + 1,
            name: eventNames[index % eventNames.length],
            datetime: format(randomDate, 'yyyy-MM-dd'),
            time: `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
            description: `Details for ${eventNames[index % eventNames.length]} on ${format(randomDate, 'MMMM dd, yyyy')}`,
            href: '#',
        };
        events.push(event);
    });

    return events;
};

     // Function to add events to calendar days
export const addEventsToDays = (days, events) => {
    events.forEach(event => {
        const day = days.find(d => d.date === event.datetime);
        if (day) {
            day.events.push(event);
        }
    });
    return days;
};
