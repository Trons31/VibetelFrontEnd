import { pusher } from './pusher';

export const emitPusherEvent = async (channel: string, event: string, data: any) => {
  await pusher.trigger(channel, event, data);
};