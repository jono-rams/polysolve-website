export {};

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (
      command: 'config',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}