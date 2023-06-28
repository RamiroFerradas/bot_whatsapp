export interface ChatContext {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
    participant?: string;
  };
  messageTimestamp: number;
  pushName: string;
  broadcast: boolean;
  message: {
    messageContextInfo: {
      deviceListMetadata: any; // Tipo específico depende de la estructura de DeviceListMetadata
      deviceListMetadataVersion: number;
    };
    ephemeralMessage: {
      message: any; // Tipo específico depende de la estructura de Message
    };
  };
  body: string;
  from: string;
}
