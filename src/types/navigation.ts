export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

export type TabParamList = {
  Search: undefined;
  Favorites: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type TabIconProps = {
  routeName: string;
  focused: boolean;
  color: string;
  size: number;
};
