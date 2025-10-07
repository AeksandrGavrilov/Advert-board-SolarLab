export interface SearchAdvertsRequest {
  search? : string | null;
  showNonActive? : boolean | null;
  category? : string | null;
  categoryId?: string,
}