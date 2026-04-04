'use client';

import { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dict = Record<string, any>;

interface LocaleContextValue {
  locale: string;
  dict: Dict;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  dict: {},
});

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: string;
  dict: Dict;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useDict() {
  return useContext(LocaleContext);
}
