"use client";

import { useEffect, useState } from "react";
import {
  StreamChat,
  Channel as StreamChannelType,
  type Message,
} from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageComposer,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import { censorChatText } from "../lib/chat-moderation";

const ACCEPTED_CHAT_FILES = [
  "image/*",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export type ClassroomChatProps = {
  apiKey: string;
  userToken: string;
  userId: string;
  firstName: string;
  channelId: string;
  /** Optional: unified package channel label. */
  packageId?: string | null;
  /** Optional: expose the watched Stream channel for whiteboard live sync. */
  onChannelReady?: (channel: StreamChannelType | null) => void;
};

export default function ClassroomChat({
  apiKey,
  userToken,
  userId,
  firstName,
  channelId,
  packageId,
  onChannelReady,
}: ClassroomChatProps) {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannelType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const chatTitle = packageId ? "צ'אט כיתה · חומרי חבילה" : "צ'אט כיתה חכם";

  useEffect(() => {
    let isMounted = true;

    if (!apiKey || !userToken || !channelId || !userId) {
      setError("חסרים פרטי התחברות לצ'אט");
      onChannelReady?.(null);
      return;
    }

    const chatClient = StreamChat.getInstance(apiKey);

    const initChat = async () => {
      try {
        setError(null);

        // Never pass an empty/partial user object — Stream's latest SDK requires
        // a fully populated UserResponse. The token is the second argument.
        await chatClient.connectUser(
          {
            id: userId,
            name: `${firstName} (${userId.slice(0, 4)})`,
          },
          userToken
        );

        const ch = chatClient.channel("messaging", channelId);
        await ch.watch();

        // Restrict attachments to PDF, DOC, and images (.cursorrules)
        const attachmentManager = ch.messageComposer?.attachmentManager;
        if (attachmentManager) {
          attachmentManager.acceptedFiles = ACCEPTED_CHAT_FILES;
        }

        if (isMounted) {
          setClient(chatClient);
          setChannel(ch);
          onChannelReady?.(ch);
        }
      } catch (err) {
        console.error("Stream Chat connection error:", err);
        if (isMounted) {
          setError("התחברות לצ'אט נכשלה. ודא ש־Stream מוגדר כראוי.");
          onChannelReady?.(null);
        }
      }
    };

    initChat();

    return () => {
      isMounted = false;
      onChannelReady?.(null);
      chatClient.disconnectUser().catch(() => undefined);
    };
  }, [apiKey, userToken, userId, firstName, channelId, onChannelReady]);

  if (error) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-2xl px-4">
        <span className="text-red-600 font-medium text-sm text-center">{error}</span>
      </div>
    );
  }

  if (!client || !channel) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-2xl">
        <span className="text-neutral-500 font-medium text-sm animate-pulse">
          מתחבר לערוץ התקשורת המאובטח...
        </span>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[200px] w-full border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm bg-white/80 backdrop-blur-md">
      <Chat client={client} theme="messaging light">
        <Channel
          channel={channel}
          doSendMessageRequest={async (activeChannel, message) => {
            const payload: Message = { ...message };
            if (payload.text) {
              payload.text = censorChatText(payload.text);
            }
            return activeChannel.sendMessage(payload);
          }}
        >
          <Window>
            <ChannelHeader title={chatTitle} />
            <MessageList />
            <MessageComposer focus />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
