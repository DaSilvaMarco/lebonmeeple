import * as React from 'react';
import { ThemeProvider } from './ThemeProvider';

export function Provider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
