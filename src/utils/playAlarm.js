export default function playAlarm(alarmSoundFilename, alarmVolume) {
  const alarmSoundURL = new URL(
    "../assets/audio/" + alarmSoundFilename,
    import.meta.url
  ).href;

  const alarm = new Audio(alarmSoundURL);
  alarm.volume = alarmVolume;
  alarm.play();
}
