export interface ICharacterFilters {
  page?: string;
  limit?: string;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
  location?: string;
  [key: string]: string | undefined;
}
