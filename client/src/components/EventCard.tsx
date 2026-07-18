import Link from '@/components/Link';
import type { EventFrontmatter } from '@/lib/content-types';

const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface EventCardProps {
  event: EventFrontmatter;
}

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.date);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = dayNames[date.getDay()];

  return (
    <Link href={`/events/${event.slug}`} className="group flex gap-4">
      <div className="flex-shrink-0 w-14 text-center">
        <div className="text-sm font-medium text-[#4a5c4a]">{month}.{day}</div>
        <div className="text-[10px] text-[#4a5c4a]/60 uppercase">{dayName}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="aspect-[16/9] overflow-hidden rounded-sm mb-2">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="text-sm font-medium mb-1 group-hover:text-[#4a5c4a] transition-colors truncate">
          {event.title}
        </h3>
        <p className="text-xs text-gray-500">
          {event.startTime} − {event.endTime}｜{event.place}
        </p>
      </div>
    </Link>
  );
}
