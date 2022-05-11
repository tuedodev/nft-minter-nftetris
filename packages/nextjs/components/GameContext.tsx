import React from 'react';
import { GameContextType } from '../types/game';

export const GameContext = React.createContext<GameContextType | null>(null);
