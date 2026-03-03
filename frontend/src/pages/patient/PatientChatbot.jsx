import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Settings,
  Send,
  HeartPulse,
  User,
  Plus,
} from "lucide-react";

const PatientChatbot = () => {
  const { t } = useTranslation();

  const navItems = [
    { name: t('common.dashboard'), href: "/patient/dashboard", icon: LayoutDashboard },
    { name: t('common.appointments'), href: "/patient/appointments", icon: Calendar },
    { name: t('common.myRecords'), href: "/patient/records", icon: FileText },
    { name: t('common.prescriptions'), href: "/patient/prescriptions", icon: Pill },
    { name: t('common.aiHealthAssistant'), href: "/patient/chatbot", icon: HeartPulse },
    { name: t('common.settings'), href: "/patient/settings", icon: Settings },
  ];

  const initialMessages = [
    {
      id: "1",
      content: t("chatbot.welcome"),
      sender: "bot",
      timestamp: new Date(),
    },
  ];

  const initialConversation = {
    id: "conversation-1",
    title: t("chatbot.newChat"),
    messages: initialMessages,
  };

  const [conversations, setConversations] = useState([initialConversation]);
  const [activeConversationId, setActiveConversationId] = useState(
    initialConversation.id,
  );
  const [inputValue, setInputValue] = useState("");

  const activeConversation =
    conversations.find(
      (conversation) => conversation.id === activeConversationId,
    ) || conversations[0];

  const messages = activeConversation ? activeConversation.messages : [];

  const handleSendMessage = (text = null) => {
    const messageContent = text || inputValue;
    if (!messageContent.trim() || !activeConversation) return;

    const currentConversationId = activeConversation.id;

    const userMessage = {
      id: Date.now().toString(),
      content: messageContent,
      sender: "user",
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== currentConversationId) return conversation;
        const updatedMessages = [...conversation.messages, userMessage];
        let updatedTitle = conversation.title;
        if (updatedTitle === t("chatbot.newChat")) {
          const trimmed = messageContent.trim();
          updatedTitle =
            trimmed.length > 30
              ? `${trimmed.slice(0, 30)}...`
              : trimmed || updatedTitle;
        }
        return {
          ...conversation,
          messages: updatedMessages,
          title: updatedTitle,
        };
      }),
    );
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses = {
        default: t("chatbot.responses.default"),
        headache: t("chatbot.responses.headache"),
        prescription: t("chatbot.responses.prescription"),
        appointment: t("chatbot.responses.appointment"),
      };

      let response = botResponses.default;
      const lowerInput = messageContent.toLowerCase();

      if (lowerInput.includes("headache") || lowerInput.includes("pain")) {
        response = botResponses.headache;
      } else if (
        lowerInput.includes("prescription") ||
        lowerInput.includes("medicine") ||
        lowerInput.includes("medication")
      ) {
        response = botResponses.prescription;
      } else if (
        lowerInput.includes("appointment") ||
        lowerInput.includes("book")
      ) {
        response = botResponses.appointment;
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== currentConversationId) return conversation;
          return {
            ...conversation,
            messages: [...conversation.messages, botMessage],
          };
        }),
      );
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    t("chatbot.actions.cold"),
    t("chatbot.actions.stress"),
    t("chatbot.actions.explain"),
    t("chatbot.actions.book"),
  ];

  const showQuickActions = messages.length === 1;

  const handleNewChat = () => {
    const timestamp = Date.now().toString();
    const newConversation = {
      id: `conversation-${timestamp}`,
      title: t("chatbot.newChat"),
      messages: [
        {
          id: `welcome-${timestamp}`,
          content: t("chatbot.welcome"),
          sender: "bot",
          timestamp: new Date(),
        },
      ],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setInputValue("");
  };

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    setInputValue("");
  };

  return (
    <DashboardLayout
      navItems={navItems}
      userType="patient"
    >
      <div className="flex gap-6 max-w-6xl mx-auto">
        <div className="w-64 flex-shrink-0 hidden md:flex">
          <div className="dashboard-card p-4 h-[600px] flex flex-col w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">
                {t("chatbot.historyTitle")}
              </h2>
              <span className="text-[10px] text-muted-foreground">
                {t("chatbot.currentChat")}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewChat}
              className="w-full justify-start mb-3"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("chatbot.newChat")}
            </Button>
            <div className="flex-1 overflow-y-auto space-y-1">
              {conversations.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  {t("chatbot.noHistory")}
                </p>
              ) : (
                conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => handleSelectConversation(conversation.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      conversation.id === activeConversationId
                        ? "bg-secondary text-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="block truncate">
                      {conversation.title}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              {t("chatbot.title")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("chatbot.subtitle")}
            </p>
          </div>

          <div className="dashboard-card flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "bot"
                        ? "bg-primary/10"
                        : "bg-accent/10"
                    }`}
                  >
                    {message.sender === "bot" ? (
                      <HeartPulse className="w-5 h-5 text-primary" />
                    ) : (
                      <User className="w-5 h-5 text-accent" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender === "bot"
                        ? "bg-secondary text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === "bot"
                          ? "text-muted-foreground"
                          : "text-primary-foreground/70"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {showQuickActions && (
              <div className="px-6 pb-4">
                <p className="text-sm text-muted-foreground mb-3">
                  {t("chatbot.quickQuestions")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(action)}
                      className="text-xs"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("chatbot.placeholder")}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {t("chatbot.disclaimer")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientChatbot;
