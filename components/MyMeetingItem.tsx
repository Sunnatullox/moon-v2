import MeetingCard from '@/components/MeetingCard';
import { Call } from '@stream-io/video-react-sdk';
import { CalendarCheck, CalendarClock, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MyMeetingItem({
  call,
}: {
  call: Call;
}) {
  const meetingLink = `/meeting/${call.id}`;
  const router = useRouter();

  const isInFuture =
    call.state.startsAt && new Date(call.state.startsAt) > new Date();

  const hasEnded = !!call.state.endedAt;

  return (
    <div>
      <MeetingCard
        key={(call as Call).id}
        mymeetings
        call={(call as Call)}
        icon={hasEnded ? <CalendarCheck /> : <CalendarClock />}
        title={(call as Call).state?.custom?.description || 'No Description'}
        date={(call as Call).state?.startsAt?.toLocaleString() || 'No Date'}
        isPreviousMeeting={hasEnded}
        link={isInFuture ? meetingLink : '!#'}
        buttonIcon1={!isInFuture ? <Video /> : undefined}
        buttonText={isInFuture ? 'Join' : !hasEnded ? 'View' : undefined}
        handleClick={() => router.push(meetingLink)}
      />
    </div>
  );
}
