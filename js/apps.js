/**
 * Agile Conqueror Company — App Catalog & Studio Assets
 */
const STUDIO = {
  name: "Agile Conqueror Company",
  tagline: "Always for the better...",
  email: "hakanxcevik7@gmail.com",
  logo: "assets/images/studio/logo.png",
  cover: "assets/images/studio/cover.jpg",
  appStoreDeveloper: "https://apps.apple.com/us/developer/hakan-cevik/id1852694895",
  googlePlayDeveloper: "https://play.google.com/store/apps/dev?id=5496923901044457269"
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "sci-fi", label: "Sci-Fi Companions" },
  { id: "rpg", label: "RPG / Story" },
  { id: "puzzle", label: "Puzzles" },
  { id: "education", label: "Education" },
  { id: "kids", label: "Kids" },
  { id: "utility", label: "Utility" }
];

const APPS = [
  {
    id: "bridge-companion",
    name: "Bridge Companion of Star Trek",
    hook: "Command your bridge experience with missions, combat, lore, and tools.",
    description: "Dive into missions, combat, lore and tools — all while managing your quarters.",
    category: "sci-fi",
    categoryLabel: "Sci-Fi Companion",
    accent: "sci-fi",
    icon: "assets/images/apps/bridge-companion-icon.png",
    screenshot: "assets/images/screenshots/bridge-companion.jpg",
    appStore: "https://apps.apple.com/us/app/bridge-companion-of-star-trek/id6761728029",
    googlePlay: "https://play.google.com/store/apps/details?id=com.agile.bridgecompanion.st",
    comingSoon: false,
    unofficial: true,
    featured: true
  },
  {
    id: "captains-log",
    name: "Captain's Log of Star Trek",
    hook: "Log your space journey, discoveries, and captain's notes.",
    description: "Document your journey with logs, quizzes, memory games, and mission tools.",
    category: "sci-fi",
    categoryLabel: "Sci-Fi Companion",
    accent: "sci-fi",
    icon: "assets/images/apps/captains-log-icon.png",
    screenshot: "assets/images/screenshots/captains-log.jpg",
    appStore: "https://apps.apple.com/us/app/captains-log-of-star-trek/id6755225372",
    googlePlay: "https://play.google.com/store/apps/details?id=com.hakancevik.captainslog",
    comingSoon: false,
    unofficial: true,
    featured: true
  },
  {
    id: "galaxy-commander",
    name: "Galaxy Commander of Star Wars",
    hook: "A galactic command companion for fans of space battles and lore.",
    description: "Explore galactic sectors, strategy, and lore in a command-style companion experience.",
    category: "sci-fi",
    categoryLabel: "Sci-Fi Companion",
    accent: "sci-fi",
    icon: "assets/images/apps/galaxy-commander-icon.png",
    screenshot: "assets/images/screenshots/galaxy-commander.jpg",
    appStore: null,
    googlePlay: "https://play.google.com/store/apps/details?id=com.agile.galaxycommander.sw",
    comingSoon: false,
    unofficial: true,
    featured: false
  },
  {
    id: "heroic-echo",
    name: "Heroic Echo of Marvel",
    hook: "A heroic fan companion for character moments, lore, and discovery.",
    description: "Discover character moments, lore archives, and heroic highlights in one companion app.",
    category: "companion",
    categoryLabel: "Companion",
    accent: "companion",
    icon: "assets/images/apps/heroic-echo-icon.png",
    screenshot: "assets/images/screenshots/heroic-echo.jpg",
    appStore: null,
    googlePlay: "https://play.google.com/store/apps/details?id=com.hakancevik.marvelhandbook",
    comingSoon: false,
    unofficial: true,
    featured: false
  },
  {
    id: "starfleet-odyssey",
    name: "Starfleet Odyssey",
    hook: "An interactive sci-fi RPG with branching stories, mini-games, and premium chapters.",
    description: "A choice-driven sci-fi RPG with branching episodes, deck mini-games, and premium story paths.",
    category: "rpg",
    categoryLabel: "RPG / Story",
    accent: "rpg",
    icon: "assets/images/apps/captains-log-icon.png",
    screenshot: "assets/images/screenshots/bridge-companion.jpg",
    appStore: null,
    googlePlay: null,
    comingSoon: true,
    unofficial: true,
    featured: true
  },
  {
    id: "meowpedia",
    name: "Cat: MeowPedia",
    hook: "Cat breeds, quizzes, puzzles, and playful learning for cat lovers.",
    description: "Explore cat breeds, take quizzes, and solve playful puzzles made for feline fans.",
    category: "education",
    categoryLabel: "Puzzle / Education",
    accent: "education",
    icon: "assets/images/apps/meowpedia-icon.png",
    screenshot: "assets/images/screenshots/meowpedia.jpg",
    appStore: "https://apps.apple.com/us/app/cat-meowpedia/id6760706363",
    googlePlay: "https://play.google.com/store/apps/details?id=com.agile.meowpedia",
    comingSoon: false,
    unofficial: false,
    featured: true
  },
  {
    id: "world-puzzle-blocks",
    name: "World Puzzle Blocks",
    hook: "Explore the world through geography puzzles, maps, and colorful blocks.",
    description: "Learn geography through map-based puzzles and colorful block challenges.",
    category: "puzzle",
    categoryLabel: "Puzzle",
    accent: "puzzle",
    icon: "assets/images/apps/world-puzzle-blocks-icon.png",
    screenshot: "assets/images/screenshots/world-puzzle-blocks.jpg",
    appStore: "https://apps.apple.com/us/app/world-puzzle-blocks/id6758859255",
    googlePlay: "https://play.google.com/store/apps/details?id=com.agile.worldpuzzleblocks",
    comingSoon: false,
    unofficial: false,
    featured: false
  },
  {
    id: "wonka-kids",
    name: "Wonka Kids: Learn & Play",
    hook: "Bright, safe, joyful learning games for kids.",
    description: "Colorful, parent-friendly learning games designed for curious young explorers.",
    category: "kids",
    categoryLabel: "Kids / Education",
    accent: "kids",
    icon: "assets/images/apps/wonka-kids-icon.png",
    screenshot: null,
    appStore: "https://apps.apple.com/us/app/wonka-kids-learn-play/id6756822771",
    googlePlay: null,
    comingSoon: false,
    unofficial: false,
    featured: false
  },
  {
    id: "mymarker",
    name: "MyMarker",
    hook: "A clean and focused utility app for everyday marking and tracking.",
    description: "A minimal utility for marking, tracking, and organizing everyday tasks.",
    category: "utility",
    categoryLabel: "Utility",
    accent: "utility",
    icon: "assets/images/apps/mymarker-icon.png",
    screenshot: "assets/images/screenshots/mymarker.jpg",
    appStore: null,
    googlePlay: "https://play.google.com/store/apps/details?id=com.hakancevik.mymarker",
    comingSoon: false,
    unofficial: false,
    featured: false
  }
];

const FAQ_ITEMS = [
  {
    question: "How can I contact support?",
    answer: `Email us at <a href="mailto:hakanxcevik7@gmail.com">hakanxcevik7@gmail.com</a>. We typically respond within a few business days. Please include your device model, OS version, and app name.`
  },
  {
    question: "Are the fan companion apps official?",
    answer: "Fan companion apps (sci-fi and superhero themed) are <strong>unofficial and independent</strong>. They are not affiliated with, endorsed by, or sponsored by any franchise rights holder. They are passion projects built for fans."
  },
  {
    question: "Where can I download the apps?",
    answer: `Find our apps on the <a href="https://apps.apple.com/us/developer/hakan-cevik/id1852694895" target="_blank" rel="noopener noreferrer">App Store</a> and <a href="https://play.google.com/store/apps/dev?id=5496923901044457269" target="_blank" rel="noopener noreferrer">Google Play</a>. Each app card on this site includes store buttons when available.`
  },
  {
    question: "How do I report a bug?",
    answer: "Send an email to support with steps to reproduce the issue, screenshots if possible, and your app version. The more detail you provide, the faster we can help."
  },
  {
    question: "How do I request a feature?",
    answer: "We love hearing from users. Email your feature idea with a brief description of how it would improve your experience. Not every request can be implemented, but all feedback is read."
  },
  {
    question: "Are the apps available on both iOS and Android?",
    answer: "Many apps are available on both platforms, but availability varies by app. Check the store buttons on each app card, or visit our developer pages on the App Store and Google Play."
  },
  {
    question: "How can I delete my data?",
    answer: "Most apps store data locally on your device. Uninstalling the app typically removes local data. For apps with cloud features, contact support and we will guide you through data deletion."
  },
  {
    question: "Where can I read the Privacy Policy?",
    answer: `Read our studio Privacy Policy at <a href="privacy.html">privacy.html</a>. Some individual apps may also link to app-specific policies within the app settings.`
  }
];

const HERO_ORBIT_APPS = APPS.filter((a) => !a.comingSoon || a.id === "starfleet-odyssey").slice(0, 8);
