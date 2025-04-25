"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MessageSquare,
  User,
  Search,
  Send,
  PaperclipIcon,
  ArrowRight,
  MoreVertical,
  Phone,
  Video,
  Info,
  Smile,
  Image as ImageIcon,
  Trash2
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { MotionDiv } from "@/components/MotionWrapper";

// Messages skeleton loader
const MessagesSkeletonLoader = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-6"></h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[70vh]">
          {/* Contacts list skeleton - left sidebar */}
          <div className="border-r border-gray-200 dark:border-gray-700">
            {/* Search box skeleton */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            </div>

            {/* Contacts list skeleton */}
            <div className="overflow-y-auto h-full pb-16">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-3"></div>
                  <div className="flex-grow">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                  <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area skeleton - middle and right */}
          <div className="col-span-2 flex flex-col">
            {/* Chat header skeleton */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-3"></div>
                <div>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-1"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Messages area skeleton */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[75%] ${index % 2 === 0 ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-100 dark:bg-blue-900/30'} rounded-lg p-3 animate-pulse`}>
                    <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-2"></div>
                    <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse self-end"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input skeleton */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-10 flex-grow bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty state for when no messages exist
const EmptyMessagesState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
        <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Messages Yet</h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        You don't have any messages yet. When you start conversations with property owners or potential buyers, they will appear here.
      </p>
      <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <ArrowRight className="h-5 w-5 mr-2" />
        Browse Properties
      </button>
    </div>
  );
};

// Mock message data
const mockContacts = [
  {
    id: "user1",
    name: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    lastMessage: "I'm interested in the property. Is it still available?",
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    unread: 2,
    online: true
  },
  {
    id: "user2",
    name: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    lastMessage: "Can we schedule a visit for the apartment tomorrow?",
    timestamp: new Date(Date.now() - 3600000 * 12), // 12 hours ago
    unread: 0,
    online: false
  },
  {
    id: "user3",
    name: "Amit Kumar",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    lastMessage: "Thank you for the information. I'll get back to you soon.",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    unread: 0,
    online: false
  },
  {
    id: "user4",
    name: "Neha Singh",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    lastMessage: "What's the total cost including all fees?",
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    unread: 1,
    online: true
  },
  {
    id: "user5",
    name: "Vikram Mehta",
    avatar: "",
    lastMessage: "I'll send you the documents you requested.",
    timestamp: new Date(Date.now() - 86400000 * 4), // 4 days ago
    unread: 0,
    online: false
  }
];

// Mock conversation data for a selected contact
const mockConversation = [
  {
    id: "msg1",
    sender: "user1",
    text: "Hello, I'm interested in your property at Mumbai Heights. Is it still available?",
    timestamp: new Date(Date.now() - 3600000 * 24),
    read: true
  },
  {
    id: "msg2",
    sender: "me",
    text: "Hi there! Yes, the property is still available. Would you like to schedule a viewing?",
    timestamp: new Date(Date.now() - 3600000 * 23),
    read: true
  },
  {
    id: "msg3",
    sender: "user1",
    text: "That would be great. What times do you have available this week?",
    timestamp: new Date(Date.now() - 3600000 * 22),
    read: true
  },
  {
    id: "msg4",
    sender: "me",
    text: "I have slots available on Wednesday afternoon and Friday morning. Does either of those work for you?",
    timestamp: new Date(Date.now() - 3600000 * 21),
    read: true
  },
  {
    id: "msg5",
    sender: "user1",
    text: "Wednesday afternoon works perfectly. Can we say around 4 PM?",
    timestamp: new Date(Date.now() - 3600000 * 4),
    read: true
  },
  {
    id: "msg6",
    sender: "me",
    text: "4 PM on Wednesday is confirmed. I'll send you the address details shortly. Looking forward to meeting you!",
    timestamp: new Date(Date.now() - 3600000 * 3),
    read: true
  },
  {
    id: "msg7",
    sender: "user1",
    text: "I'm interested in the property. Is it still available?",
    timestamp: new Date(Date.now() - 3600000 * 2),
    read: false
  }
];

export default function MessagesPage() {
  const { user, loading: authLoading, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Load contacts on initial render
  useEffect(() => {
    const loadContacts = async () => {
      if (!isAuthenticated) return;

      try {
        // In a real app, we would fetch from API
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        setContacts(mockContacts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading contacts:', error);
        setIsLoading(false);
      }
    };

    loadContacts();
  }, [isAuthenticated]);

  // Load conversation when a contact is selected
  useEffect(() => {
    if (selectedContact) {
      // In a real app, we would fetch conversation from API based on contact ID
      setConversation(mockConversation);

      // Mark messages as read
      const updatedContacts = contacts.map(contact =>
        contact.id === selectedContact.id
          ? { ...contact, unread: 0 }
          : contact
      );
      setContacts(updatedContacts);
    }
  }, [selectedContact]);

  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  // Handle contact selection
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedContact) return;

    const newMessage = {
      id: `msg${Date.now()}`,
      sender: 'me',
      text: message,
      timestamp: new Date(),
      read: false
    };

    setConversation([...conversation, newMessage]);
    setMessage('');
  };

  // Format timestamp
  const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for conversation grouping
  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);

    if (messageDate.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (
      messageDate.toDateString() ===
      new Date(now.setDate(now.getDate() - 1)).toDateString()
    ) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  // Filter contacts based on search term
  const filteredContacts = searchTerm
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : contacts;

  // Show skeleton loader while loading
  if (authLoading || isLoading) {
    return <MessagesSkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Messages
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[70vh]">
          {/* Contacts list - left sidebar */}
          <div className="border-r border-gray-200 dark:border-gray-700">
            {/* Search box */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="w-full py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {contacts.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No contacts found.
              </div>
            ) : (
              <div className="overflow-y-auto h-full pb-16">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 transition-colors duration-150 ${
                      selectedContact?.id === contact.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => handleSelectContact(contact)}
                  >
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        {contact.avatar ? (
                          <Image
                            src={contact.avatar}
                            alt={contact.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        ) : (
                          <User className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                        )}
                      </div>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white">{contact.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(contact.timestamp) === 'Today'
                            ? formatMessageTime(contact.timestamp)
                            : formatDate(contact.timestamp)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[180px]">
                          {contact.lastMessage}
                        </p>
                        {contact.unread > 0 && (
                          <span className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-medium">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat area - middle */}
          <div className="col-span-2 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      {selectedContact.avatar ? (
                        <Image
                          src={selectedContact.avatar}
                          alt={selectedContact.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      )}
                      {selectedContact.online && (
                        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">{selectedContact.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedContact.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                      <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                      <Info className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Messages area */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {conversation.map((msg, index) => (
                    <MotionDiv
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {msg.sender !== 'me' && (
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 mr-2">
                          {selectedContact.avatar ? (
                            <Image
                              src={selectedContact.avatar}
                              alt={selectedContact.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4 m-auto text-gray-400 dark:text-gray-500" />
                          )}
                        </div>
                      )}
                      <div className={`max-w-[75%] ${
                        msg.sender === 'me'
                          ? 'bg-blue-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tr-lg rounded-br-lg rounded-bl-lg'
                      } p-3 rounded-lg shadow-sm`}>
                        <p>{msg.text}</p>
                        <div className={`text-xs mt-1 ${
                          msg.sender === 'me'
                            ? 'text-blue-200 dark:text-blue-300'
                            : 'text-gray-500 dark:text-gray-400'
                        } flex justify-end`}>
                          {formatMessageTime(msg.timestamp)}
                        </div>
                      </div>
                      {msg.sender === 'me' && (
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 ml-2">
                          {user?.profileImage?.url ? (
                            <Image
                              src={user.profileImage.url}
                              alt={user.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4 m-auto text-gray-400 dark:text-gray-500" />
                          )}
                        </div>
                      )}
                    </MotionDiv>
                  ))}
                  <div ref={messagesEndRef}></div>
                </div>

                {/* Message input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                    >
                      <Smile className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                    >
                      <ImageIcon className="h-5 w-5" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-grow py-2 px-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className={`p-2 rounded-full focus:outline-none ${
                        message.trim()
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!message.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <EmptyMessagesState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
