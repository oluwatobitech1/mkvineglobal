export const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;
export const priceRange = (min: number, max: number) => `${gbp(min)} to ${gbp(max)}`;
