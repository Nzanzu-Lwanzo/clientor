const onSendSound = new Audio("/sounds/on-send.wav");
const onErrorSound = new Audio("/sounds/on-error.wav");

export const playSoundOnSend = (audioElement?: HTMLAudioElement) => {
  if (audioElement) {
    audioElement.play().catch(() => {});
  } else {
    onSendSound.volume = 0.5;
    onSendSound.play().catch(() => {});
  }
};

export const playSoundOnError = (audioElement?: HTMLAudioElement) => {
  if (audioElement) {
    audioElement.play().catch(() => {});
  } else {
    onErrorSound.volume = 0.3;
    onErrorSound.play().catch(() => {});
  }
};
