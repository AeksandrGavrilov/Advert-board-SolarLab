export interface CreateAdvertRequest {
  Name: string;
  Cost: number;
  Phone: string;
  Location: string;
  CategoryId: string;
  Description?: string;
  Images?: File[]; 
}
