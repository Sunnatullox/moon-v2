'use client';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import MeetingItem from '../../../../components/MyMeetingItem';

function MyMeetingPage() {
  const { user } = useUser();

  const client = useStreamVideoClient();

  const [calls, setCalls] = useState<Call[]>();

  useEffect(() => {
    async function loadCalls() {
      if (!client || !user?.id) {
        return;
      }

      const { calls } = await client.queryCalls({
        sort: [{ field: 'starts_at', direction: -1 }],
        filter_conditions: {
          starts_at: { $exists: true },
          $or: [
            { created_by_user_id: user.id },
            { members: { $in: [user.id] } },
          ],
        },
      });

      setCalls(calls);
    }

    loadCalls();
  }, [client, user?.id]);






  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">My Meetings</h1>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls?.map((call) => <MeetingItem  key={call.id} call={call} />)}
      </div>
    </section>
  );
}

export default MyMeetingPage;
