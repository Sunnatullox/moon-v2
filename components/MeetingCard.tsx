'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';
import { useToast } from './ui/use-toast';
import { Call } from '@stream-io/video-react-sdk';
import { PhoneMissed } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MeetingCardProps {
  title: string;
  date: string;
  icon: any;
  isPreviousMeeting?: boolean;
  buttonIcon1?: any;
  buttonText?: string;
  handleClick: () => void;
  link: string;
  mymeetings?: boolean | undefined;
  call?: Call;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
  mymeetings,
  call,
}: MeetingCardProps) => {
  const { toast } = useToast();
  const router = useRouter();

  async function endChanel() {
    try {
      await call?.endCall();
      router.refresh()
      toast({ title: 'Channel deleted successfully' });
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
  }


  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          {typeof icon === 'string' ? (
            <Image src={icon} alt="upcoming" width={28} height={28} />
          ) : (
            icon
          )}
          {!call?.state.endedAt && (
            <Button
              variant="ghost"
              size={'icon'}
              className="focus-visible:ring-0"
              onClick={() => endChanel()}
            >
              <PhoneMissed />
            </Button>
          )}
          {mymeetings && (
            <span className="ml-auto text-lg">
              {isPreviousMeeting ? 'Ended' : 'Unfinished'}
            </span>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn('flex justify-center relative', {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn('rounded-full', { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {typeof buttonIcon1 === 'string' ? (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              ) : (
                <>{buttonIcon1}</>
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: 'Link Copied',
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
