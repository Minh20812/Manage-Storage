import { useMemo } from "react";

export const useFilter = (items, filter) => {
  const filteredItems = useMemo(() => {
    let result = [...items];
    if (filter === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    return result;
  }, [items, filter]);

  return filteredItems;
};
