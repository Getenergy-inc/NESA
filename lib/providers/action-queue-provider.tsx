"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of the context
type ActionQueueContextType = {
  actionQueue: any[];
  dispatch: React.Dispatch<any>;
};

// Create the context with a default value
const ActionQueueContext = createContext<ActionQueueContextType | undefined>(undefined);

// Define the reducer function
function actionQueueReducer(state: any[], action: any) {
  switch (action.type) {
    case 'ADD_ACTION':
      return [...state, action.payload];
    case 'CLEAR_ACTIONS':
      return [];
    default:
      return state;
  }
}

// Create the provider component
export function ActionQueueProvider({ children }: { children: ReactNode }) {
  const [actionQueue, dispatch] = useReducer(actionQueueReducer, []);

  return (
    <ActionQueueContext.Provider value={{ actionQueue, dispatch }}>
      {children}
    </ActionQueueContext.Provider>
  );
}

// Create a hook to use the context
export function useActionQueue() {
  const context = useContext(ActionQueueContext);
  if (context === undefined) {
    throw new Error('useActionQueue must be used within an ActionQueueProvider');
  }
  return context;
}