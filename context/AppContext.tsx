import { CandidateVehicle, Role } from '@/types/models';
import React, { createContext, useContext, useMemo, useState } from 'react';

type AppState = {
  role: Role | null;
  setRole: (r: Role | null) => void;
  walletBalance: number;
  setWalletBalance: (n: number) => void;
  selectedCandidate?: CandidateVehicle;
  setSelectedCandidate: (c?: CandidateVehicle) => void;
  lastBoardingToken?: string;
  setLastBoardingToken: (t?: string) => void;
};

const Ctx = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [walletBalance, setWalletBalance] = useState<number>(50);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateVehicle | undefined>(undefined);
  const [lastBoardingToken, setLastBoardingToken] = useState<string | undefined>(undefined);

  const value = useMemo(
    () => ({ role, setRole, walletBalance, setWalletBalance, selectedCandidate, setSelectedCandidate, lastBoardingToken, setLastBoardingToken }),
    [role, walletBalance, selectedCandidate, lastBoardingToken]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
