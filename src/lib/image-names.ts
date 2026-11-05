// Builds the exact file name for a numbered image slot, e.g. (5, "Logo grid and proportion system") -> "05-logo-grid-and-proportion-system".
export const slotFile = (n: number, title: string) =>
  `${String(n).padStart(2, "0")}-${title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
