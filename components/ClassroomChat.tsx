"use client";

import { useEffect, useState } from "react";
import { StreamChat, Channel as StreamChannelType } from "stream-chat";
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

// ביטויים רגולריים למספרי טלפון (ישראלים בד"כ) וכתובות אימייל
const PHONE_REGEX = /(?:05\d[\s-]*\d{3}[\s-]*\d{4})|(?:0\d[\s-]*\d{3}[\s-]*\d{4})/g;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * פונקציה לצנזור טקסט לפני שליחתו לשרת
 */
function censorContent(text: string): string {
  return text
    .replace(PHONE_REGEX, "[צונזר מספר טלפון]")
    .replace(EMAIL_REGEX, "[צונזר אימייל]");
}

export type ClassroomChatProps = {
  apiKey: string;
  userToken: string;
  userId: string;
  firstName: string;
  channelId: string;
};

export default function ClassroomChat({
  apiKey,
  userToken,
  userId,
  firstName,
  channelId,
}: ClassroomChatProps) {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannelType | null>(null);

  useEffect(() => {
    let isMounted = true;
    const chatClient = StreamChat.getInstance(apiKey);

    const initChat = async () => {
      try {
        // 1. מסוך פרטים (Masking): נציג רק את השם הפרטי וחלק מה-ID
        // כך שמשתמשים אחרים בחדר יראו רק את המידע הזה.
        // אם לא סופק טוקן אמיתי מהשרת (למשל בסביבת פיתוח), נשתמש בטוקן פיתוח
        const actualToken =
          !userToken || userToken === "mock-token" ? chatClient.devToken(userId) : userToken;

        await chatClient.connectUser(
          {
            id: userId,
            name: `${firstName} (${userId.slice(0, 4)})`,
          },
          actualToken
        );

        const ch = chatClient.channel("messaging", channelId);
        
        // 3. הרשאות גישה נאכפות בשרת, כאן אנו מבקשים לצפות בחדר
        await ch.watch();

        if (isMounted) {
          setClient(chatClient);
          setChannel(ch);
        }
      } catch (error) {
        console.error("Stream Chat connection error:", error);
      }
    };

    initChat();

    return () => {
      isMounted = false;
      chatClient.disconnectUser();
    };
  }, [apiKey, userToken, userId, firstName, channelId]);

  if (!client || !channel) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center bg-slate-50 border border-slate-200 rounded-xl">
        <span className="text-slate-500 font-bold text-sm animate-pulse">
          מתחבר לערוץ התקשורת המאובטח...
        </span>
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full max-w-4xl mx-auto border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Stream Chat עובד טוב כברירת מחדל גם בממשקים מודרניים.
          אפשר להתאים את ה-theme ואת ה-CSS במידת הצורך */}
      <Chat client={client} theme="messaging light">
        <Channel
          channel={channel}
          doSendMessageRequest={async (channelId, messageData) => {
            // 2. ניטור תוכן (Moderation): צנזור טקסט בזמן אמת
            if (messageData.text) {
              messageData.text = censorContent(messageData.text);
            }
            return await client.channel("messaging", channelId).sendMessage(messageData);
          }}
        >
          <Window>
            <ChannelHeader title="צ'אט כיתה חכם" />
            <MessageList />
            <MessageComposer
              focus
            />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
