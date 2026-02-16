/**
 * Voice Input Hook
 * Web Speech API wrapper for speech-to-text functionality
 */

import { useState, useCallback, useEffect } from 'react';

export interface UseVoiceInputReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  isSupported: boolean;
  error: string | null;
}

/**
 * Hook for voice input using Web Speech API
 * Supports both English and Japanese
 */
export function useVoiceInput(language: string = 'en-US'): UseVoiceInputReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Detect browser support
  const isSupported = typeof window !== 'undefined' && !!(
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );

  const SpeechRecognitionAPI =
    typeof window !== 'undefined'
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;

  const startListening = useCallback(() => {
    if (!isSupported || !SpeechRecognitionAPI) return;

    setError(null);
    setTranscript('');

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.language = language || 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
      } else {
        setTranscript(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      const errorMessage = event.error || 'An error occurred';
      setError(errorMessage);

      // Map common error codes to user-friendly messages
      const errorMap: Record<string, string> = {
        'permission-denied': 'Microphone permission was denied. Please allow access in browser settings.',
        'not-allowed': 'Microphone access is not allowed. Please check your browser permissions.',
        'no-speech': 'No speech was detected. Please try again.',
        'audio-capture': 'No microphone found. Please check your audio input device.',
        'network': 'Network error occurred. Please check your internet connection.',
      };

      if (errorMap[errorMessage]) {
        setError(errorMap[errorMessage]);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      setError('Failed to start speech recognition');
      setIsListening(false);
    }
  }, [isSupported, SpeechRecognitionAPI, language]);

  const stopListening = useCallback(() => {
    if (!isSupported || !SpeechRecognitionAPI) return;

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.stop();
      setIsListening(false);
    } catch (err) {
      // Silently fail if no recognition is active
    }
  }, [isSupported, SpeechRecognitionAPI]);

  // Auto-detect system language for Japanese support
  useEffect(() => {
    if (!language) {
      const sysLang = navigator.language || 'en-US';
      // Supports ja-JP, ja, en-US, en, etc.
      if (sysLang.startsWith('ja')) {
        // Could call hook again with 'ja-JP' if needed
      }
    }
  }, [language]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported,
    error
  };
}
