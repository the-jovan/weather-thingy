export interface IHistoricalItem {
  time: string;
  temperature: number;
  weather_icons: string[];
}

export interface IHistorical {
  [key: string]: {
    date: string;
    hourly: IHistoricalItem[];
  };
}
