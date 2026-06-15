declare module '@react-native-community/voice' {
  export interface SpeechResultsEvent {
    value?: string[];
  }

  export interface SpeechErrorEvent {
    error?: string;
  }

  export default class Voice {
    static onSpeechStart: () => void;
    static onSpeechEnd: () => void;
    static onSpeechResults: (e: SpeechResultsEvent) => void;
    static onSpeechError: (e: SpeechErrorEvent) => void;
    
    static start(language?: string): Promise<void>;
    static stop(): Promise<void>;
    static cancel(): Promise<void>;
    static destroy(): Promise<void>;
    static removeAllListeners(): void;
    static isRecognizing(): Promise<boolean>;
  }
}
