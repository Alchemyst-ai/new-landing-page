import { createContext, useContext } from "react";

type CollapsibleContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(
  undefined
);

export const CollapsibleProvider = CollapsibleContext.Provider;

export const useCollapsible = () => {
  const context = useContext(CollapsibleContext);
  if (context === undefined) {
    throw new Error("useCollapsible must be used within a CollapsibleProvider");
  }
  return context;
};
