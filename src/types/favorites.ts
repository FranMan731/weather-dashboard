import { WeatherResponse } from "./weather";

export type FavoriteItem = {
  id: number;
  data: WeatherResponse;
  timestamp: number;
};

export interface Item {
  id: string;
  name: string;
  content: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ListItemsData {
  listItems: Item[];
}

export interface GetItemData {
  getItem: Item;
}

export interface UpsertItemVars {
  input: {
    id: string;
    name?: string;
    content?: string | null;
    metadata?: Record<string, any>;
  };
}
