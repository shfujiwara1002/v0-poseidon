import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { logger } from '../utils/logger';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface UIState {
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  modalStack: string[];
  notifications: Notification[];
  isLoading: boolean;
}

interface UIContextValue extends UIState {
  toggleSidebar: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  pushModal: (id: string) => void;
  popModal: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

// Create a default context value to prevent "No default value" errors
const defaultUIContext: UIContextValue = {
  theme: 'dark',
  sidebarOpen: true,
  modalStack: [],
  notifications: [],
  isLoading: false,
  toggleSidebar: () => logger.warn('UI context not initialized'),
  setTheme: () => logger.warn('UI context not initialized'),
  pushModal: () => logger.warn('UI context not initialized'),
  popModal: () => logger.warn('UI context not initialized'),
  addNotification: () => logger.warn('UI context not initialized'),
  removeNotification: () => logger.warn('UI context not initialized'),
  setLoading: () => logger.warn('UI context not initialized'),
};

const UIContext = createContext<UIContextValue>(defaultUIContext);

export function UIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UIState>({
    theme: 'dark',
    sidebarOpen: true,
    modalStack: [],
    notifications: [],
    isLoading: false
  });

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const setTheme = useCallback((theme: 'dark' | 'light') => {
    setState(prev => ({ ...prev, theme }));
    // Apply theme to document
    document.documentElement.classList.toggle('light-theme', theme === 'light');
  }, []);

  const pushModal = useCallback((id: string) => {
    setState(prev => ({ ...prev, modalStack: [...prev.modalStack, id] }));
  }, []);

  const popModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      modalStack: prev.modalStack.slice(0, -1)
    }));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, { ...notification, id }]
    }));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id)
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const value: UIContextValue = {
    ...state,
    toggleSidebar,
    setTheme,
    pushModal,
    popModal,
    addNotification,
    removeNotification,
    setLoading
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  return context;
}
