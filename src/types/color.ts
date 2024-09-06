export interface Color {
  id: string;
  name: string;
  baseHue: number;
  lightnessScale: number[];
  chromaScale: number[];
}

export interface TailwindConfigExport {
  colors: {
    [key: string]: {
      [key: number]: string;
    };
  };
}
