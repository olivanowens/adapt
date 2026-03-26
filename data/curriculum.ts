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

// iPhone Track — Level 1 full content
export const IPHONE_LEVELS: Level[] = [
  {
    level: 1,
    title: 'Getting to Know Your iPhone',
    description: 'Learn the basics of your iPhone — the buttons, the screen, and how to wake it up.',
    xpReward: 50,
    miniLessons: [
      {
        id: 'iph-1-1',
        title: 'The Outside of Your iPhone',
        duration: '45 sec',
        content: 'Your iPhone has a few buttons on the outside. On the right side you will find the Side Button — this turns your screen on and off. On the left side are the Volume Up and Volume Down buttons to make sounds louder or quieter. At the very top left is a small switch called the Ring/Silent switch — slide it down to silence your phone.',
        tip: 'Try pressing the Side Button once right now to turn your screen off, then press it again to wake it back up.',
      },
      {
        id: 'iph-1-2',
        title: 'Your Home Screen',
        duration: '40 sec',
        content: 'When you unlock your iPhone, the first thing you see is your Home Screen. This is where all your apps live. Each small picture is called an app. You can tap any app to open it. At the bottom of the screen is a row called the Dock — it holds your most-used apps so they are always easy to find.',
        tip: 'Look at your Dock right now. You will likely see Phone, Messages, Safari, and Camera there.',
      },
      {
        id: 'iph-1-3',
        title: 'Basic Touch Gestures',
        duration: '45 sec',
        content: 'Your iPhone responds to touch. A single tap opens apps and buttons. A swipe is when you slide your finger across the screen — swipe left or right to move between pages of apps. To go back to the Home Screen at any time, swipe up from the very bottom of the screen. If your iPhone has a Home Button (a round button at the bottom), press it once to go home.',
        tip: 'Practice swiping left on your Home Screen to see if you have more pages of apps.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Where is the Side Button on your iPhone?',
        options: ['On the bottom', 'On the right side', 'On the back', 'On the top'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'What does pressing the Side Button once do?',
        options: ['Opens the camera', 'Calls 911', 'Turns the screen on or off', 'Deletes apps'],
        correctIndex: 2,
      },
      {
        id: 'q3',
        question: 'What is the first screen you see when you unlock your iPhone called?',
        options: ['The Lock Screen', 'The App Store', 'The Home Screen', 'The Control Center'],
        correctIndex: 2,
      },
      {
        id: 'q4',
        question: 'What is the row of apps at the very bottom of your Home Screen called?',
        options: ['The Toolbar', 'The Dock', 'The Menu', 'The Shelf'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        question: 'How do you go back to the Home Screen on a newer iPhone (no Home Button)?',
        options: ['Press the volume button', 'Shake the phone', 'Swipe up from the bottom', 'Double tap the screen'],
        correctIndex: 2,
      },
      {
        id: 'q6',
        question: 'What does the Ring/Silent switch do?',
        options: ['Turns the phone off', 'Silences or un-silences your phone', 'Opens the camera', 'Locks your screen'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 2,
    title: 'Navigating Your iPhone',
    description: 'Learn how to move around your iPhone, open apps, and find what you need.',
    xpReward: 60,
    miniLessons: [
      { id: 'iph-2-1', title: 'Opening and Closing Apps', duration: '40 sec', content: 'Coming soon — full lesson content will be added here.', tip: 'Practice opening the Settings app by tapping the gear icon.' },
      { id: 'iph-2-2', title: 'Swiping Between Apps', duration: '35 sec', content: 'Coming soon — full lesson content will be added here.', tip: 'Try switching between two apps using the App Switcher.' },
      { id: 'iph-2-3', title: 'Using the Search Feature', duration: '40 sec', content: 'Coming soon — full lesson content will be added here.', tip: 'Swipe down from the middle of your Home Screen to find the search bar.' },
    ],
    quiz: [
      { id: 'q1', question: 'How do you open an app?', options: ['Hold it down', 'Tap it once', 'Swipe left on it', 'Shake the phone'], correctIndex: 1 },
      { id: 'q2', question: 'Where is the search bar on your iPhone?', options: ['At the very top', 'Swipe down from the middle of the Home Screen', 'In Settings', 'In the Dock'], correctIndex: 1 },
      { id: 'q3', question: 'How do you close an app completely?', options: ['Press the volume button', 'Swipe it away in the App Switcher', 'Turn the phone off', 'Delete it'], correctIndex: 1 },
      { id: 'q4', question: 'What is the App Switcher?', options: ['A place to download apps', 'A view of all your recently open apps', 'Your Home Screen', 'The App Store'], correctIndex: 1 },
      { id: 'q5', question: 'How do you get to the App Switcher?', options: ['Press the Side Button twice', 'Swipe up and hold from the bottom', 'Tap the Dock', 'Press volume down'], correctIndex: 1 },
      { id: 'q6', question: 'What happens when you swipe left on the Home Screen?', options: ['Deletes apps', 'Goes to next page of apps', 'Opens search', 'Calls your last contact'], correctIndex: 1 },
    ],
  },
];

// Placeholder levels 3-10 for iPhone
for (let i = 3; i <= 10; i++) {
  const titles: Record<number, string> = {
    3: 'Settings & Personalization',
    4: 'Calling & Contacts',
    5: 'Texting & Messages',
    6: 'Photos & Camera',
    7: 'Storage & iCloud',
    8: 'Staying Safe Online',
    9: 'Apps & the App Store',
    10: 'Advanced iPhone Skills',
  };
  IPHONE_LEVELS.push({
    level: i,
    title: titles[i] ?? `Level ${i}`,
    description: 'Full lesson content coming soon.',
    xpReward: 50 + i * 10,
    miniLessons: [
      { id: `iph-${i}-1`, title: 'Mini-Lesson 1', duration: '45 sec', content: 'Full content coming soon.', tip: '' },
      { id: `iph-${i}-2`, title: 'Mini-Lesson 2', duration: '40 sec', content: 'Full content coming soon.', tip: '' },
      { id: `iph-${i}-3`, title: 'Mini-Lesson 3', duration: '45 sec', content: 'Full content coming soon.', tip: '' },
    ],
    quiz: [],
  });
}

export const CURRICULUM: Record<DeviceTrack, Level[]> = {
  iphone: IPHONE_LEVELS,
  android: IPHONE_LEVELS.map(l => ({ ...l, title: l.title + ' (Android)' })),
  mac: IPHONE_LEVELS.map(l => ({ ...l, title: l.title + ' (Mac)' })),
  windows: IPHONE_LEVELS.map(l => ({ ...l, title: l.title + ' (Windows)' })),
};

export const TECH_OF_THE_DAY = [
  { term: 'Wi-Fi', definition: 'A wireless connection that lets your device access the internet without plugging in a cable.' },
  { term: 'App', definition: 'A program on your phone or computer designed to do a specific task, like checking email or taking photos.' },
  { term: 'Update', definition: 'A new version of your software that fixes problems and adds improvements. Always safe to install.' },
  { term: 'Passcode', definition: 'A number or pattern you enter to unlock your phone and keep it private.' },
  { term: 'Cloud', definition: 'Storage space on the internet where your photos, files, and data are saved safely.' },
  { term: 'Spam', definition: 'Unwanted emails or messages, often trying to sell you something or trick you.' },
  { term: 'Browser', definition: 'The app you use to visit websites, like Safari on iPhone or Chrome on Android.' },
];

export const VOCAB_OF_THE_DAY = [
  { word: 'Tap', meaning: 'To lightly touch the screen once with your finger to open something.' },
  { word: 'Swipe', meaning: 'To slide your finger across the screen to scroll or navigate.' },
  { word: 'Notification', meaning: 'A message or alert that pops up to tell you about something.' },
  { word: 'Settings', meaning: 'The place where you control how your phone looks and behaves.' },
  { word: 'Download', meaning: 'To save something from the internet onto your device.' },
  { word: 'Screenshot', meaning: 'A photo of whatever is currently showing on your screen.' },
  { word: 'Airplane Mode', meaning: 'A setting that turns off all wireless signals — used when flying.' },
];
