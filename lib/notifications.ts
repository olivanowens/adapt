import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// How notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  if (!Device.isDevice) return false; // simulators can't receive push notifications

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyStreakReminder() {
  // Cancel any existing streak reminder before scheduling a new one
  await cancelNotification('daily-streak');

  await Notifications.scheduleNotificationAsync({
    identifier: 'daily-streak',
    content: {
      title: "Don't break your streak! 🔥",
      body: "You haven't done your lesson today. Keep the momentum going!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 19, // 7 PM
      minute: 0,
    },
  });
}

export async function cancelDailyStreakReminder() {
  await cancelNotification('daily-streak');
}

export async function sendLevelUpNotification(newLevel: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `You reached Level ${newLevel}! 🎉`,
      body: 'Keep going — your next level is waiting.',
    },
    trigger: null, // fires immediately
  });
}

export async function sendChallengeCompleteNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Challenge complete! ✅",
      body: "Great work today. Come back tomorrow to keep your streak alive.",
    },
    trigger: null,
  });
}

async function cancelNotification(identifier: string) {
  try {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  } catch {
    // notification may not exist yet — that's fine
  }
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
