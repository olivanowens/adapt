export type DeviceTrack = 'iphone' | 'android' | 'mac' | 'windows';

export const DEVICE_TRACKS = [
  { id: 'iphone' as DeviceTrack, label: 'iPhone', icon: '📱', available: true },
  { id: 'android' as DeviceTrack, label: 'Android', icon: '🤖', available: true },
  { id: 'mac' as DeviceTrack, label: 'Mac', icon: '💻', available: true },
  { id: 'windows' as DeviceTrack, label: 'Windows', icon: '🖥️', available: true },
];

export interface MiniLesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  tip: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Level {
  level: number;
  title: string;
  description: string;
  xpReward: number;
  miniLessons: MiniLesson[];
  quiz: QuizQuestion[];
}

// ─── IPHONE ───────────────────────────────────────────────
export const IPHONE_LEVELS: Level[] = [
  {
    level: 1,
    title: 'Getting Comfortable',
    description: 'Learn the basics — your screen, how to tap and swipe, and how to open apps.',
    xpReward: 50,
    miniLessons: [
      {
        id: 'iph-1-1',
        title: 'Screen Basics',
        duration: '45 sec',
        content: 'Your iPhone screen is a touchscreen — it responds to the touch of your finger. When the screen is dark, press the Side Button (on the right side of your phone) once to wake it up. You may need to enter your passcode or use Face ID to unlock it. The screen shows everything you need — apps, messages, and settings.',
        tip: 'Press the Side Button now to turn your screen off. Then press it again to wake it back up.',
      },
      {
        id: 'iph-1-2',
        title: 'Tapping & Swiping',
        duration: '40 sec',
        content: 'There are two main ways to use your iPhone screen. A tap is a quick, light touch with one finger — use it to open apps and press buttons. A swipe is when you slide your finger across the screen — swipe left or right to see more apps, or swipe up from the bottom to go back to your Home Screen.',
        tip: 'Try tapping the Clock app to open it, then swipe up from the bottom to go back home.',
      },
      {
        id: 'iph-1-3',
        title: 'Opening Apps',
        duration: '40 sec',
        content: 'Apps are the small pictures (called icons) on your screen. Each one opens a different program. To open an app, tap it once with your finger. To go back to the Home Screen, swipe up from the very bottom of the screen. If your phone has a round Home Button at the bottom, press it once to go home.',
        tip: 'Find the Settings app — it looks like a gray square with gears. Tap it to open it, then press the Home Button or swipe up to go back.',
      },
    ],
    quiz: [
      { id: 'q1', question: 'How do you wake up your iPhone screen?', options: ['Shake it', 'Press the Side Button', 'Tap the screen twice', 'Press volume up'], correctIndex: 1 },
      { id: 'q2', question: 'What is a "tap"?', options: ['Sliding your finger across the screen', 'A quick light touch with one finger', 'Pressing two buttons at once', 'Holding your finger down for 3 seconds'], correctIndex: 1 },
      { id: 'q3', question: 'What is a "swipe"?', options: ['A quick tap', 'Shaking the phone', 'Sliding your finger across the screen', 'Pressing the volume button'], correctIndex: 2 },
      { id: 'q4', question: 'What do you call the small pictures on your Home Screen?', options: ['Buttons', 'Apps or Icons', 'Files', 'Photos'], correctIndex: 1 },
      { id: 'q5', question: 'How do you open an app?', options: ['Hold it for 3 seconds', 'Swipe left on it', 'Tap it once', 'Press the Side Button'], correctIndex: 2 },
      { id: 'q6', question: 'How do you go back to the Home Screen on a newer iPhone?', options: ['Press volume down', 'Swipe up from the bottom', 'Double tap the screen', 'Shake the phone'], correctIndex: 1 },
    ],
  },
  {
    level: 2,
    title: 'Navigation',
    description: 'Learn how to move around your iPhone — the Home Screen, buttons, and switching apps.',
    xpReward: 60,
    miniLessons: [
      {
        id: 'iph-2-1',
        title: 'Your Home Screen',
        duration: '40 sec',
        content: 'The Home Screen is the main page of your iPhone. It shows all your apps as small icons. At the bottom is a row called the Dock — it holds your most-used apps. You can swipe left to see more pages of apps. The small dots above the Dock show how many pages you have.',
        tip: 'Look at the Dock at the bottom. You should see Phone, Messages, Safari, and Camera.',
      },
      {
        id: 'iph-2-2',
        title: 'Buttons on Your iPhone',
        duration: '35 sec',
        content: 'Your iPhone has a few important buttons. The Side Button on the right turns the screen on and off. The Volume Up and Volume Down buttons on the left make sounds louder or quieter. The small switch above the volume buttons is the Ring/Silent switch — slide it down to silence your phone.',
        tip: 'Try sliding the Ring/Silent switch down. You should see an orange stripe, which means silent is on.',
      },
      {
        id: 'iph-2-3',
        title: 'Switching Between Apps',
        duration: '40 sec',
        content: 'When you open an app, it stays open in the background even when you go to your Home Screen. To see all your open apps, swipe up from the bottom and pause in the middle — this opens the App Switcher. You can swipe left and right to see your open apps, and swipe an app upward to close it completely.',
        tip: 'Open two apps (like Messages and Camera), then swipe up and pause to see them both in the App Switcher.',
      },
    ],
    quiz: [
      { id: 'q1', question: 'What is the row of apps at the bottom of the Home Screen called?', options: ['The Shelf', 'The Dock', 'The Menu Bar', 'The Footer'], correctIndex: 1 },
      { id: 'q2', question: 'How do you see more pages of apps on your Home Screen?', options: ['Tap the screen twice', 'Swipe left', 'Press the Side Button', 'Shake the phone'], correctIndex: 1 },
      { id: 'q3', question: 'What does the Ring/Silent switch do?', options: ['Turns the phone off', 'Silences or un-silences your phone', 'Locks the screen', 'Opens Settings'], correctIndex: 1 },
      { id: 'q4', question: 'What is the App Switcher?', options: ['The App Store', 'A view of all your recently open apps', 'Your Home Screen', 'The Control Center'], correctIndex: 1 },
      { id: 'q5', question: 'How do you open the App Switcher?', options: ['Press Side Button twice', 'Swipe up and pause', 'Tap the Dock', 'Press volume down'], correctIndex: 1 },
      { id: 'q6', question: 'How do you fully close an app in the App Switcher?', options: ['Tap it', 'Swipe it upward', 'Double tap it', 'Press the Side Button'], correctIndex: 1 },
    ],
  },
  {
    level: 3,
    title: 'Communication',
    description: 'Learn how to make calls, send texts, and manage your notifications.',
    xpReward: 70,
    miniLessons: [
      { id: 'iph-3-1', title: 'Making & Receiving Calls', duration: '45 sec', content: 'To make a phone call, tap the green Phone app. Tap "Keypad" to dial a number, or tap "Contacts" to call someone you know. Tap the green phone button to call. To answer an incoming call, swipe the green button to the right. To end a call, tap the red button.', tip: 'Open the Phone app and find someone in your Contacts to call.' },
      { id: 'iph-3-2', title: 'Sending Texts', duration: '40 sec', content: 'To send a text message, tap the green Messages app. Tap the pencil icon in the top right to start a new message. Type the person\'s name or number at the top, then tap the text box at the bottom to type your message. Tap the blue arrow to send.', tip: 'Try sending a text to yourself by typing your own phone number.' },
      { id: 'iph-3-3', title: 'Understanding Notifications', duration: '40 sec', content: 'Notifications are alerts that appear on your screen to let you know something happened — like a new text or email. They appear at the top of your screen as banners. You can swipe them away or tap them to open the app. To see all your notifications, swipe down from the very top of your screen.', tip: 'Swipe down from the top of your screen to see your Notification Center.' },
    ],
    quiz: [
      { id: 'q1', question: 'What app do you use to make phone calls?', options: ['Messages', 'FaceTime', 'Phone', 'Contacts'], correctIndex: 2 },
      { id: 'q2', question: 'How do you answer an incoming call?', options: ['Tap the red button', 'Press volume up', 'Swipe the green button to the right', 'Shake the phone'], correctIndex: 2 },
      { id: 'q3', question: 'What app do you use to send text messages?', options: ['Mail', 'Phone', 'Notes', 'Messages'], correctIndex: 3 },
      { id: 'q4', question: 'How do you send a text message after typing it?', options: ['Press the Side Button', 'Tap the blue arrow', 'Swipe up', 'Shake the phone'], correctIndex: 1 },
      { id: 'q5', question: 'What is a notification?', options: ['A type of app', 'An alert that tells you something happened', 'A phone call', 'A setting'], correctIndex: 1 },
      { id: 'q6', question: 'How do you see all your notifications at once?', options: ['Swipe up from the bottom', 'Tap the Clock app', 'Swipe down from the top of the screen', 'Press the Side Button twice'], correctIndex: 2 },
    ],
  },
  {
    level: 4, title: 'Apps & Icons', description: 'Learn what app icons mean and how to use your core apps.',
    xpReward: 80,
    miniLessons: [
      { id: 'iph-4-1', title: 'What Icons Mean', duration: '40 sec', content: 'Every app on your iPhone has an icon — a small picture that tells you what the app does. The green phone means Phone calls. The green speech bubble means Messages (texts). The blue compass means Safari (internet). The colorful camera means Camera. Learning what icons look like helps you find what you need quickly.', tip: 'Look at your Home Screen and try to identify 5 app icons without opening them.' },
      { id: 'iph-4-2', title: 'Your Core Apps', duration: '45 sec', content: 'There are a few apps you will use every day. Phone — for calls. Messages — for texts. Safari — for browsing the internet. Camera — for taking photos. Settings — for adjusting your phone. Mail — for email. These apps are usually in your Dock or on the first page of your Home Screen.', tip: 'Find each of these apps on your phone: Phone, Messages, Safari, Camera, and Settings.' },
      { id: 'iph-4-3', title: 'Switching Between Apps', duration: '40 sec', content: 'You can have many apps open at the same time. To switch between them quickly, swipe up from the bottom and pause to open the App Switcher. Swipe left and right to find the app you want, then tap it to go back to it. This saves time instead of always going back to the Home Screen.', tip: 'Open Messages and Safari, then use the App Switcher to switch between them.' },
    ],
    quiz: [
      { id: 'q1', question: 'What does a green speech bubble icon represent?', options: ['Phone', 'FaceTime', 'Messages', 'Mail'], correctIndex: 2 },
      { id: 'q2', question: 'What app do you use to browse the internet on iPhone?', options: ['Chrome', 'Safari', 'Maps', 'Files'], correctIndex: 1 },
      { id: 'q3', question: 'Where are your most-used apps usually kept?', options: ['In Settings', 'In the Dock at the bottom', 'On the last page', 'In iCloud'], correctIndex: 1 },
      { id: 'q4', question: 'What is the Settings app icon?', options: ['A blue compass', 'A gray square with gears', 'A green phone', 'A camera'], correctIndex: 1 },
      { id: 'q5', question: 'Can you have more than one app open at a time?', options: ['No, only one', 'Yes, many apps can be open at once', 'Only two', 'Only if you have Wi-Fi'], correctIndex: 1 },
      { id: 'q6', question: 'What is the fastest way to switch between open apps?', options: ['Go to the Home Screen each time', 'Use the App Switcher', 'Restart the phone', 'Use Siri'], correctIndex: 1 },
    ],
  },
  {
    level: 5, title: 'Settings', description: 'Learn how to adjust volume, brightness, and key settings on your iPhone.',
    xpReward: 90,
    miniLessons: [
      { id: 'iph-5-1', title: 'Volume Types', duration: '40 sec', content: 'Your iPhone has two types of volume. Ringer volume controls how loud your ringtone and alerts are — use the Volume buttons on the left side of your phone to adjust this. Media volume controls how loud music, videos, and calls sound — this also changes with the Volume buttons while something is playing.', tip: 'Press the Volume Up button a few times and watch the volume indicator appear on screen.' },
      { id: 'iph-5-2', title: 'Adjusting Brightness', duration: '35 sec', content: 'If your screen is too dark or too bright, you can adjust it. Swipe down from the top right corner of your screen to open Control Center. You will see a slider that looks like a sun — drag it up to make the screen brighter, or down to make it dimmer. You can also go to Settings → Display & Brightness.', tip: 'Swipe down from the top right corner and adjust your brightness slider.' },
      { id: 'iph-5-3', title: 'Key Settings to Know', duration: '45 sec', content: 'The Settings app is where you control everything on your iPhone. Open it by tapping the gray gear icon. Inside you will find: Wi-Fi (to connect to the internet), Bluetooth (to connect to wireless devices), Notifications (to control your alerts), and Privacy (to protect your personal information).', tip: 'Open Settings and tap Wi-Fi to see if you are connected to a network.' },
    ],
    quiz: [
      { id: 'q1', question: 'Which buttons control your iPhone volume?', options: ['Side Button', 'Volume Up and Down buttons on the left side', 'The Home Button', 'Buttons on the back'], correctIndex: 1 },
      { id: 'q2', question: 'Where do you swipe to open Control Center?', options: ['Up from the bottom', 'Down from the top right corner', 'Left from the Home Screen', 'Up from the Dock'], correctIndex: 1 },
      { id: 'q3', question: 'How do you adjust screen brightness in Control Center?', options: ['Tap the sun icon once', 'Drag the sun slider up or down', 'Press volume buttons', 'Turn the phone sideways'], correctIndex: 1 },
      { id: 'q4', question: 'What does the Settings app icon look like?', options: ['A blue gear', 'A gray square with gears', 'A white cloud', 'A green phone'], correctIndex: 1 },
      { id: 'q5', question: 'Where do you go to connect to Wi-Fi?', options: ['The App Store', 'Settings → Wi-Fi', 'Control Center only', 'The Camera app'], correctIndex: 1 },
      { id: 'q6', question: 'What section in Settings helps protect your personal information?', options: ['Display', 'Sounds', 'Privacy', 'General'], correctIndex: 2 },
    ],
  },
  {
    level: 6, title: 'Internet', description: 'Learn how to use Wi-Fi, browse safely, and use Safari.',
    xpReward: 100,
    miniLessons: [
      { id: 'iph-6-1', title: 'Connecting to Wi-Fi', duration: '40 sec', content: 'Wi-Fi lets your iPhone connect to the internet without using your phone plan data. To connect, go to Settings → Wi-Fi. Make sure Wi-Fi is turned on (the switch should be green). You will see a list of available networks. Tap your home network name and enter the password if asked.', tip: 'Open Settings → Wi-Fi and confirm your phone is connected to your home network.' },
      { id: 'iph-6-2', title: 'Safe Browsing', duration: '45 sec', content: 'When you browse the internet, it is important to stay safe. Look for a padlock icon next to the website address — this means the site is secure. Be careful about clicking links in emails or texts that you did not expect. Real companies never ask for your password or Social Security number by email.', tip: 'Open Safari and look at the address bar — do you see a padlock icon on a website you trust?' },
      { id: 'iph-6-3', title: 'Safari Basics', duration: '40 sec', content: 'Safari is the internet browser on your iPhone. Tap the blue compass icon to open it. At the top you will see the address bar — tap it to type a website address or search for something. Use the arrow buttons at the bottom to go back or forward. Tap the book icon to see your bookmarks and favorites.', tip: 'Open Safari and type "weather" in the address bar to search for today\'s forecast.' },
    ],
    quiz: [
      { id: 'q1', question: 'Where do you go to connect to Wi-Fi?', options: ['Safari', 'Settings → Wi-Fi', 'Control Center → Bluetooth', 'The App Store'], correctIndex: 1 },
      { id: 'q2', question: 'What does a padlock icon next to a website address mean?', options: ['The site is blocked', 'The site is secure', 'You need a password', 'The site is offline'], correctIndex: 1 },
      { id: 'q3', question: 'What should you do if an email asks for your password?', options: ['Reply with your password', 'Ignore or delete it — real companies never ask this way', 'Call the company right away', 'Forward it to a friend'], correctIndex: 1 },
      { id: 'q4', question: 'What is Safari?', options: ['A social media app', 'The iPhone\'s internet browser', 'An email app', 'A maps app'], correctIndex: 1 },
      { id: 'q5', question: 'How do you search for something in Safari?', options: ['Shake the phone', 'Tap the address bar and type', 'Press the Side Button', 'Use the volume buttons'], correctIndex: 1 },
      { id: 'q6', question: 'What does Wi-Fi allow your phone to do?', options: ['Make calls', 'Connect to the internet without using phone data', 'Charge faster', 'Use the camera'], correctIndex: 1 },
    ],
  },
  {
    level: 7, title: 'Photos', description: 'Learn how to take photos, view them, and share them with others.',
    xpReward: 110,
    miniLessons: [
      { id: 'iph-7-1', title: 'Taking Photos', duration: '40 sec', content: 'To take a photo, tap the Camera app (the icon that looks like a camera). Point the phone at what you want to photograph and tap the large white circle button at the bottom to take the picture. Make sure to hold the phone steady. You can also use the volume buttons to take a photo.', tip: 'Open the Camera app and take a photo of something near you.' },
      { id: 'iph-7-2', title: 'Viewing Your Photos', duration: '35 sec', content: 'All your photos are saved in the Photos app. Tap the colorful flower icon to open it. You will see your most recent photos first. Tap any photo to see it bigger. Pinch two fingers together to zoom out, or spread two fingers apart to zoom in. Swipe left or right to see the next or previous photo.', tip: 'Open the Photos app and find a photo you took recently. Try zooming in on it.' },
      { id: 'iph-7-3', title: 'Sharing Photos', duration: '40 sec', content: 'To share a photo, open it in the Photos app, then tap the Share button — it looks like a box with an arrow pointing up. You will see options to send it by text, email, or other apps. Tap "Message" to send it as a text, or "Mail" to send it by email. Choose your contact and tap Send.', tip: 'Open a photo and tap the Share button to see all the ways you can send it.' },
    ],
    quiz: [
      { id: 'q1', question: 'How do you take a photo on your iPhone?', options: ['Press the Side Button twice', 'Tap the large white circle in the Camera app', 'Shake the phone', 'Press volume up twice'], correctIndex: 1 },
      { id: 'q2', question: 'Where are all your photos saved?', options: ['iCloud only', 'The Files app', 'The Photos app', 'Safari'], correctIndex: 2 },
      { id: 'q3', question: 'How do you zoom into a photo?', options: ['Tap the photo twice quickly', 'Spread two fingers apart on the screen', 'Press volume up', 'Shake the phone'], correctIndex: 1 },
      { id: 'q4', question: 'What does the Share button look like?', options: ['A heart', 'A box with an arrow pointing up', 'A camera', 'A star'], correctIndex: 1 },
      { id: 'q5', question: 'Which app do you use to view your photos?', options: ['Camera', 'Files', 'Photos', 'Safari'], correctIndex: 2 },
      { id: 'q6', question: 'How do you send a photo as a text message?', options: ['Tap Share → Message', 'Email it first', 'Print it', 'Use iCloud only'], correctIndex: 0 },
    ],
  },
  {
    level: 8, title: 'Apps', description: 'Learn what apps are, how to use the App Store, and how to manage your apps.',
    xpReward: 120,
    miniLessons: [
      { id: 'iph-8-1', title: 'What Apps Are', duration: '35 sec', content: 'Apps are programs that help you do specific things on your iPhone. Some apps come already installed — like Phone, Messages, and Camera. Others you can download for free or for a small cost. Apps can help you check the weather, read news, shop online, video call family, or play games.', tip: 'Count how many apps are on your Home Screen right now.' },
      { id: 'iph-8-2', title: 'Using the App Store', duration: '45 sec', content: 'The App Store is where you find and download new apps. Tap the blue App Store icon to open it. Tap "Search" at the bottom and type what you are looking for. When you find an app you want, tap "Get" (free) or the price button to download it. You may need to confirm with your Face ID or Apple ID password.', tip: 'Open the App Store and search for "weather" to see what free weather apps are available.' },
      { id: 'iph-8-3', title: 'Using Apps Safely', duration: '40 sec', content: 'Before downloading an app, check the reviews and ratings — look for apps with many positive reviews. Only download apps from the official App Store, never from websites. Be careful about apps that ask for too many personal details. If an app asks for your Social Security number or bank info, do not use it.', tip: 'Find an app in the App Store and scroll down to read its reviews before deciding to download it.' },
    ],
    quiz: [
      { id: 'q1', question: 'What is an app?', options: ['A type of website', 'A program that helps you do specific things on your phone', 'A phone call feature', 'A type of photo'], correctIndex: 1 },
      { id: 'q2', question: 'Where do you download new apps?', options: ['Safari', 'Settings', 'The App Store', 'The Photos app'], correctIndex: 2 },
      { id: 'q3', question: 'What does "Get" mean in the App Store?', options: ['The app costs money', 'The app is free to download', 'The app is unavailable', 'The app requires Wi-Fi only'], correctIndex: 1 },
      { id: 'q4', question: 'What should you check before downloading an unknown app?', options: ['The app\'s color', 'Reviews and ratings from other users', 'How many photos it has', 'The app developer\'s address'], correctIndex: 1 },
      { id: 'q5', question: 'Should you download apps from websites instead of the App Store?', options: ['Yes, it\'s faster', 'Only for free apps', 'No, always use the official App Store', 'Yes, if it\'s recommended by email'], correctIndex: 2 },
      { id: 'q6', question: 'What should you do if an app asks for your bank account number?', options: ['Enter it carefully', 'Do not use that app', 'Call Apple first', 'It is always safe to enter'], correctIndex: 1 },
    ],
  },
  {
    level: 9, title: 'Storage', description: 'Learn about storage, iCloud, and how to save and manage your files.',
    xpReward: 130,
    miniLessons: [
      { id: 'iph-9-1', title: 'Storage Basics', duration: '40 sec', content: 'Storage is the space on your iPhone where photos, apps, and files are kept. Every iPhone has a limited amount of storage. To check how much you have left, go to Settings → General → iPhone Storage. You will see a colored bar showing what is using your space. If it is almost full, you may need to delete some photos or apps.', tip: 'Go to Settings → General → iPhone Storage and see how much space you have left.' },
      { id: 'iph-9-2', title: 'Understanding iCloud', duration: '45 sec', content: 'iCloud is Apple\'s way of saving your information safely on the internet so it is never lost. When iCloud is on, your photos, contacts, and settings are backed up automatically. If you ever lose your phone or get a new one, iCloud can restore everything. You get 5GB free, and more storage is available for a small monthly fee.', tip: 'Go to Settings → tap your name at the top → iCloud to see what is being backed up.' },
      { id: 'iph-9-3', title: 'Saving & Managing Files', duration: '40 sec', content: 'When you download something — like a document or photo — it gets saved on your phone. You can find downloaded files in the Files app (the blue folder icon). Inside you will see folders like "Downloads." Tap a file to open it. You can also delete files you no longer need to free up space.', tip: 'Open the Files app and look inside the Downloads folder to see if anything is there.' },
    ],
    quiz: [
      { id: 'q1', question: 'What is storage on your iPhone?', options: ['Your Wi-Fi signal', 'The space where your photos, apps, and files are kept', 'Your battery life', 'Your screen brightness'], correctIndex: 1 },
      { id: 'q2', question: 'Where do you check how much storage you have left?', options: ['Settings → Wi-Fi', 'Settings → General → iPhone Storage', 'The App Store', 'Control Center'], correctIndex: 1 },
      { id: 'q3', question: 'What is iCloud?', options: ['A weather app', 'Apple\'s way of saving your information safely online', 'A type of Wi-Fi', 'An email service only'], correctIndex: 1 },
      { id: 'q4', question: 'What happens if your iCloud backup is on and you get a new phone?', options: ['You lose everything', 'iCloud can restore your information', 'You have to download everything again manually', 'Nothing changes'], correctIndex: 1 },
      { id: 'q5', question: 'How much free iCloud storage do you get?', options: ['1GB', '10GB', '5GB', '50GB'], correctIndex: 2 },
      { id: 'q6', question: 'Where can you find files you have downloaded?', options: ['The Camera app', 'The Files app', 'iCloud only', 'The App Store'], correctIndex: 1 },
    ],
  },
  {
    level: 10, title: 'Mastery', description: 'Problem solving, scam awareness, and building lasting confidence with your iPhone.',
    xpReward: 150,
    miniLessons: [
      { id: 'iph-10-1', title: 'Problem Solving', duration: '45 sec', content: 'Every iPhone user runs into problems sometimes — and that is okay. If an app is not working, try closing it and reopening it. If your phone feels slow, try restarting it: hold the Side Button and a Volume button together, then slide to power off. Wait 30 seconds, then press the Side Button to turn it back on. Most problems are fixed with a simple restart.', tip: 'Practice restarting your iPhone now so you know how to do it when you need it.' },
      { id: 'iph-10-2', title: 'Recognizing Scams', duration: '45 sec', content: 'Scammers try to trick people into giving away money or personal information. Watch out for: unexpected calls saying you owe money, texts with links you did not ask for, emails saying your account is locked, and pop-ups saying your phone has a virus. Real companies like Apple, your bank, or the government will never ask for your password or payment over text or email.', tip: 'Think about the last unexpected message or call you received. Was it a scam?' },
      { id: 'iph-10-3', title: 'Building Confidence', duration: '40 sec', content: 'You have now completed all 10 levels of the iPhone track. You have learned how to use your screen, navigate apps, communicate, stay safe online, manage your photos and storage, and protect yourself from scams. Technology changes, but the basics you have learned will stay the same. Keep practicing every day — confidence comes from use.', tip: 'Write down three things you can now do on your iPhone that you could not do before.' },
    ],
    quiz: [
      { id: 'q1', question: 'What is the first thing to try when an app is not working?', options: ['Buy a new phone', 'Close the app and reopen it', 'Delete the app', 'Call Apple'], correctIndex: 1 },
      { id: 'q2', question: 'How do you restart your iPhone?', options: ['Remove the battery', 'Hold Side Button + Volume button, slide to power off, then turn back on', 'Press the Home Button 5 times', 'Go to Settings → Restart'], correctIndex: 1 },
      { id: 'q3', question: 'Which of these is a sign of a scam?', options: ['An email from someone you know', 'A text with a link you did not ask for', 'A call from a saved contact', 'A notification from an app you use'], correctIndex: 1 },
      { id: 'q4', question: 'Will Apple ever ask for your password by text message?', options: ['Yes, sometimes', 'Only if your account is locked', 'No, never', 'Only for security updates'], correctIndex: 2 },
      { id: 'q5', question: 'What should you do if a pop-up says your phone has a virus?', options: ['Tap it immediately', 'Call the number it shows', 'Ignore or close it — it is likely a scam', 'Download the app it recommends'], correctIndex: 2 },
      { id: 'q6', question: 'What is the best way to build confidence with technology?', options: ['Only use it when necessary', 'Ask someone else to do it for you', 'Keep practicing every day', 'Buy the newest phone every year'], correctIndex: 2 },
    ],
  },
];

// ─── ANDROID ──────────────────────────────────────────────
const ANDROID_LEVELS: Level[] = [
  { level: 1, title: 'Getting Comfortable', description: 'Learn screen basics, tapping, swiping, and opening apps on Android.', xpReward: 50, miniLessons: [{ id: 'and-1-1', title: 'Screen Basics', duration: '45 sec', content: 'Your Android phone has a touchscreen that responds to your finger. Press the Power Button (usually on the right side) to wake it up. You may need to swipe up or enter a PIN to unlock it.', tip: 'Press the Power Button to turn your screen off, then press it again to wake it up.' }, { id: 'and-1-2', title: 'Tapping & Swiping', duration: '40 sec', content: 'Use a tap (quick light touch) to open apps and buttons. Use a swipe (sliding your finger) to scroll through pages or lists. Swipe up from the bottom to go home on most Android phones.', tip: 'Try tapping the Clock app to open it, then swipe up from the bottom to go back home.' }, { id: 'and-1-3', title: 'Opening Apps', duration: '40 sec', content: 'Your apps are shown as icons on your Home Screen. Tap any icon once to open it. To see all your apps, swipe up from the bottom of the Home Screen to open the App Drawer.', tip: 'Swipe up from the Home Screen to open the App Drawer and explore your apps.' }], quiz: [{ id: 'q1', question: 'How do you wake up your Android phone?', options: ['Shake it', 'Press the Power Button', 'Tap the screen twice', 'Press volume up'], correctIndex: 1 }, { id: 'q2', question: 'What is a tap?', options: ['Sliding your finger', 'A quick light touch', 'Pressing two buttons', 'Holding your finger down'], correctIndex: 1 }, { id: 'q3', question: 'Where do you find all your apps on Android?', options: ['The Settings app', 'The App Drawer', 'The notification bar', 'Google Play'], correctIndex: 1 }, { id: 'q4', question: 'How do you go to the Home Screen?', options: ['Press the Power Button', 'Swipe up from the bottom', 'Press Volume Down', 'Shake the phone'], correctIndex: 1 }, { id: 'q5', question: 'How do you open an app?', options: ['Hold it down', 'Tap it once', 'Swipe left on it', 'Press the Power Button'], correctIndex: 1 }, { id: 'q6', question: 'What is the App Drawer?', options: ['A physical drawer', 'A screen showing all your apps', 'The Settings menu', 'The camera roll'], correctIndex: 1 }] },
  ...Array.from({ length: 9 }, (_, i) => {
    const n = i + 2;
    const titles: Record<number, [string, string]> = { 2: ['Navigation', 'Home screen, buttons, and switching apps on Android.'], 3: ['Communication', 'Calls, texts, and notifications on Android.'], 4: ['Apps & Icons', 'Icon meanings and your core Android apps.'], 5: ['Settings', 'Volume, brightness, and key settings on Android.'], 6: ['Internet', 'Wi-Fi, safe browsing, and Chrome basics.'], 7: ['Photos', 'Taking, viewing, and sharing photos on Android.'], 8: ['Apps', 'The Google Play Store and using apps safely.'], 9: ['Storage', 'Storage basics, Google Drive, and managing files.'], 10: ['Mastery', 'Problem solving, scam awareness, and lasting confidence.'] };
    return { level: n, title: titles[n][0], description: titles[n][1], xpReward: 50 + n * 10, miniLessons: [{ id: `and-${n}-1`, title: 'Mini-Lesson 1', duration: '45 sec', content: 'Full lesson content coming soon.', tip: '' }, { id: `and-${n}-2`, title: 'Mini-Lesson 2', duration: '40 sec', content: 'Full lesson content coming soon.', tip: '' }, { id: `and-${n}-3`, title: 'Mini-Lesson 3', duration: '40 sec', content: 'Full lesson content coming soon.', tip: '' }], quiz: [] };
  }),
];

// ─── MAC ──────────────────────────────────────────────────
const MAC_LEVELS: Level[] = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  const titles: Record<number, [string, string]> = { 1: ['Getting Comfortable', 'Learn the desktop, trackpad, and clicking.'], 2: ['Navigation', 'The Dock, switching apps, and closing apps.'], 3: ['Files', 'Opening, saving, and organizing files on your Mac.'], 4: ['Internet', 'Using Safari to search and browse safely.'], 5: ['Keyboard', 'Typing, helpful shortcuts, and text input.'], 6: ['Settings', 'System settings, volume, and Wi-Fi.'], 7: ['Downloads', 'Downloading files, opening them, and finding them.'], 8: ['Email', 'Email basics, sending, and reading messages.'], 9: ['Organization', 'Creating folders, saving, and finding your files.'], 10: ['Mastery', 'Problem solving, scam awareness, and confidence.'] };
  return { level: n, title: titles[n][0], description: titles[n][1], xpReward: 50 + n * 10, miniLessons: [{ id: `mac-${n}-1`, title: 'Mini-Lesson 1', duration: '45 sec', content: n === 1 ? 'Your Mac desktop is the main screen you see when you start your computer. At the bottom is the Dock — a row of icons for your most-used apps. The top of the screen has the Menu Bar, which shows options for whatever app you have open. The Finder (the smiley face icon) helps you find all your files.' : 'Full lesson content coming soon.', tip: n === 1 ? 'Look at the Dock at the bottom of your screen and find the Finder icon.' : '' }, { id: `mac-${n}-2`, title: 'Mini-Lesson 2', duration: '40 sec', content: 'Full lesson content coming soon.', tip: '' }, { id: `mac-${n}-3`, title: 'Mini-Lesson 3', duration: '40 sec', content: 'Full lesson content coming soon.', tip: '' }], quiz: [] };
});

// ─── WINDOWS ──────────────────────────────────────────────
const WINDOWS_LEVELS: Level[] = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  const titles: Record<number, [string, string]> = { 1: ['Getting Comfortable', 'Learn mouse basics, clicking, and the desktop.'], 2: ['Navigation', 'The Start menu, Taskbar, and opening apps.'], 3: ['Files', 'Files, saving, and folders on Windows.'], 4: ['Internet', 'Using a browser, searching, and safe links.'], 5: ['Keyboard', 'Typing and helpful shortcuts.'], 6: ['Settings', 'Volume, display settings, and Wi-Fi.'], 7: ['Downloads', 'Downloading and opening files safely.'], 8: ['Email', 'Email basics and attachments.'], 9: ['Organization', 'File management and finding files.'], 10: ['Mastery', 'Scams, problem solving, and confidence.'] };
  return { level: n, title: titles[n][0], description: titles[n][1], xpReward: 50 + n * 10, miniLessons: [{ id: `win-${n}-1`, title: 'Mini-Lesson 1', duration: '45 sec', content: n === 1 ? 'Your Windows computer has a desktop — the main screen you see when it starts up. You use a mouse to control the cursor (the arrow on screen). Move the mouse to move the arrow. Click the left mouse button once to select things. Double-click (two quick clicks) to open files and folders.' : 'Full lesson content coming soon.', tip: n === 1 ? 'Move your mouse around and practice single-clicking on the desktop.' : '' }, { id: `win-${n}-2`, title: 'Mini-Lesson 2', duration: '40 sec', content: 'Full lesson content coming soon.', tip: '' }, { id: `win-${n}-3`, title: 'Mini-Lesson 3', duration: '40 sec', content: 'Full lesson content coming soon.', tip: '' }], quiz: [] };
});

export const CURRICULUM: Record<DeviceTrack, Level[]> = {
  iphone: IPHONE_LEVELS,
  android: ANDROID_LEVELS,
  mac: MAC_LEVELS,
  windows: WINDOWS_LEVELS,
};

// ─── DAILY CONTENT ────────────────────────────────────────
export const TECH_OF_THE_DAY = [
  { term: 'Wi-Fi', definition: 'A wireless connection that lets your device access the internet without plugging in a cable.' },
  { term: 'App', definition: 'A program on your phone or computer designed to do a specific task, like checking email or taking photos.' },
  { term: 'Update', definition: 'A new version of your software that fixes problems and adds improvements. Always safe to install.' },
  { term: 'Passcode', definition: 'A number or pattern you enter to unlock your phone and keep it private.' },
  { term: 'Cloud', definition: 'Storage space on the internet where your photos, files, and data are saved safely.' },
  { term: 'Spam', definition: 'Unwanted emails or messages, often trying to sell you something or trick you.' },
  { term: 'Browser', definition: 'The app you use to visit websites, like Safari on iPhone or Chrome on Android.' },
  { term: 'Bluetooth', definition: 'A wireless way to connect devices close together, like headphones to your phone.' },
  { term: 'Password', definition: 'A secret word or combination you use to protect your accounts. Never share it.' },
  { term: 'Notification', definition: 'An alert that pops up on your screen to let you know something happened.' },
];

export const VOCAB_OF_THE_DAY = [
  { word: 'Tap', meaning: 'To lightly touch the screen once with your finger to open something.' },
  { word: 'Swipe', meaning: 'To slide your finger across the screen to scroll or navigate.' },
  { word: 'Notification', meaning: 'A message or alert that pops up to tell you about something.' },
  { word: 'Settings', meaning: 'The place where you control how your phone looks and behaves.' },
  { word: 'Download', meaning: 'To save something from the internet onto your device.' },
  { word: 'Screenshot', meaning: 'A photo of whatever is currently showing on your screen.' },
  { word: 'Airplane Mode', meaning: 'A setting that turns off all wireless signals — used when flying.' },
  { word: 'Icon', meaning: 'A small picture on your screen that represents an app or file.' },
  { word: 'Pinch', meaning: 'To touch the screen with two fingers and bring them together to zoom out.' },
  { word: 'Scroll', meaning: 'To move up or down through a page or list by sliding your finger.' },
];
