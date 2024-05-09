export interface Game {
  id: string;
  title: string;
  slug: string;
  providerName: string;
  thumb?: {
    url: string;
  };
}
