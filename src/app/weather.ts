export interface Weather {
  weather: Info[];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  name: string;
}

interface Info {
  description: string;
  icon: string;
}
