export interface Website {
    id: string;
    name: string;
    url: string;
    status: 'up' | 'down';
    uptimePercentage: number;
    responseTime: number;
    lastChecked: Date;
    uptimeHistory: Array<'up' | 'down'>;
  }
  
  export type ThemeMode = 'light' | 'dark' | 'system';