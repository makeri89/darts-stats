import { useContext } from 'react';
import { DartContext } from '../context/dartContextInstance';

export function useDartContext() {
  const context = useContext(DartContext);
  if (context === undefined) {
    throw new Error('useDartContext must be used within a DartProvider');
  }
  return context;
}
