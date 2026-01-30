import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Request notification permissions
export const registerForPushNotifications = async () => {
    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return null;
        }

        // Get the token that uniquely identifies this device
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Push notification token:', token);

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    } catch (error) {
        console.error('Error registering for push notifications:', error);
        return null;
    }
};

// Schedule a local notification
export const scheduleWaterReminder = async (title, body, triggerTime) => {
    try {
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: triggerTime,
        });
        return id;
    } catch (error) {
        console.error('Error scheduling notification:', error);
        return null;
    }
};

// Schedule daily water reminders
export const scheduleDailyReminders = async () => {
    try {
        // Cancel all previous notifications
        await Notifications.cancelAllScheduledNotificationsAsync();

        // Schedule reminders every 2 hours from 8 AM to 8 PM
        const reminderTimes = [8, 10, 12, 14, 16, 18, 20];

        for (const hour of reminderTimes) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '💧 Su İçme Zamanı!',
                    body: 'Günlük su hedefinize ulaşmak için su içmeyi unutmayın!',
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                },
                trigger: {
                    hour,
                    minute: 0,
                    repeats: true,
                },
            });
        }

        console.log('Daily reminders scheduled successfully');
    } catch (error) {
        console.error('Error scheduling daily reminders:', error);
    }
};

// Send immediate notification
export const sendImmediateNotification = async (title, body) => {
    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: null, // Send immediately
        });
    } catch (error) {
        console.error('Error sending immediate notification:', error);
    }
};

// Cancel all scheduled notifications
export const cancelAllNotifications = async () => {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        console.log('All notifications cancelled');
    } catch (error) {
        console.error('Error cancelling notifications:', error);
    }
};

// Get all scheduled notifications
export const getScheduledNotifications = async () => {
    try {
        const notifications = await Notifications.getAllScheduledNotificationsAsync();
        return notifications;
    } catch (error) {
        console.error('Error getting scheduled notifications:', error);
        return [];
    }
};
