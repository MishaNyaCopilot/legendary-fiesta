import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscribe: () => void;
  unsubscribe: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribe = () => setIsSubscribed(true);
  const unsubscribe = () => setIsSubscribed(false);

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, subscribe, unsubscribe }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
