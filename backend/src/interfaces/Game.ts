export default interface Game {
  id: number;
  slug: string;
  title: string;
  providerName: string;
  thumb: {
    url: string;
  };
}
