'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosServices from '@/utils/axios';
import { TarotResponse } from '@/types/Tarot';
import { SajuResponse } from '@/types/Saju';

type HistoryContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  tarotHistory: TarotResponse[];
  sajuHistory: SajuResponse[];
  selectedHistory: TarotResponse | SajuResponse | null;
  setSelectedHistory: (h: TarotResponse | SajuResponse | null) => void;
  deleteTarot: (id: number) => void;
  deleteSaju: (id: number) => void;
  loading: boolean;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tarotHistory, setTarotHistory] = useState<TarotResponse[]>([]);
  const [sajuHistory, setSajuHistory] = useState<SajuResponse[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<TarotResponse | SajuResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchTarotHistory();
      fetchSajuHistory();
      setSelectedHistory(null);
    }
  }, [isOpen]);

  // useEffect(() => {
  //   setIsOpen(false);
  // }, [selectedHistory]);

  const fetchTarotHistory = async () => {
    setLoading(true);
    try {
      const response = await axiosServices.get<TarotResponse[]>('/tarot/history');
      setTarotHistory(response.data);
    } catch (error) {
      console.error('Error Fetch Tarot History:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSajuHistory = async () => {
    setLoading(true);
    try {
      const response = await axiosServices.get<SajuResponse[]>('/saju/history');
      setSajuHistory(response.data);
    } catch (error) {
      console.error('Error Fetch Saju History:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTarot = async (id: number) => {
    if (!id) return;

    try {
      const response = await axiosServices.delete(`/tarot/${id}`);
      console.log(response);
      setTarotHistory((prev) => prev.filter((tarot) => tarot.id !== id));
    } catch (error) {
      console.error('Error Delete Tarot:', error);
    }
  };

  const deleteSaju = async (id: number) => {
    if (!id) return;

    try {
      const response = await axiosServices.delete(`/saju/${id}`);
      console.log(response);
      setSajuHistory((prev) => prev.filter((saju) => saju.id !== id));
    } catch (error) {
      console.error('Error Delete Saju:', error);
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        isOpen,
        setIsOpen,
        tarotHistory,
        sajuHistory,
        selectedHistory,
        setSelectedHistory,
        deleteTarot,
        deleteSaju,
        loading,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within an HistoryProvider');
  }
  return context;
}
