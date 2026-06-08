import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchTtsAudio } from '../api/ttsApi';

export function useTts() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (text: string) => fetchTtsAudio(text),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      setIsSpeaking(true);
      audio.play();
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
      };
    },
    onError: () => setIsSpeaking(false),
  });

  function speak(text: string) {
    if (isSpeaking && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsSpeaking(false);
      return;
    }
    mutate(text);
  }

  return { speak, isSpeaking: isSpeaking || isPending };
}
