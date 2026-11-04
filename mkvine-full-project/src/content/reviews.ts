// Add real client reviews here, only ones the client has agreed to show. Never invent or edit a review's meaning.
// When a client sends a review by email and says it can be published, copy it in here.
export type ClientReview = {
  name: string;
  company?: string;
  project?: string; // e.g. "Website design"
  rating?: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export const reviews: ClientReview[] = [];
