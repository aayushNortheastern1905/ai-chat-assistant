export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  
  // Early Morning (12 AM - 5 AM)
  const earlyMorningGreetings = [
    { title: "Burning the midnight oil?", subtitle: "How can I assist you at this hour?" },
    { title: "Good night!", subtitle: "What brings you here so late?" },
    { title: "Still awake?", subtitle: "Let me help you with whatever you need." },
    { title: "Late night thoughts?", subtitle: "I'm here to help, no matter the hour." }
  ];

  // Morning (5 AM - 12 PM)
  const morningGreetings = [
    { title: "Good morning!", subtitle: "How can I help you start your day?" },
    { title: "Good morning!", subtitle: "Ready to tackle the day together?" },
    { title: "Rise and shine!", subtitle: "What can I assist you with today?" },
    { title: "Good morning!", subtitle: "Let's make today productive!" },
    { title: "Morning!", subtitle: "How may I help you today?" }
  ];

  // Afternoon (12 PM - 5 PM)
  const afternoonGreetings = [
    { title: "Good afternoon!", subtitle: "How can I help you today?" },
    { title: "Good afternoon!", subtitle: "What can I assist you with?" },
    { title: "Hope your day is going well!", subtitle: "How may I help?" },
    { title: "Good afternoon!", subtitle: "Let's get things done together." },
    { title: "Afternoon!", subtitle: "What's on your mind?" }
  ];

  // Evening (5 PM - 9 PM)
  const eveningGreetings = [
    { title: "Good evening!", subtitle: "How can I assist you tonight?" },
    { title: "Good evening!", subtitle: "What can I help you with?" },
    { title: "Evening!", subtitle: "Wrapping up your day? Let me help." },
    { title: "Good evening!", subtitle: "How may I be of service?" },
    { title: "Good evening!", subtitle: "Ready to wind down? I'm here to help." }
  ];

  // Night (9 PM - 12 AM)
  const nightGreetings = [
    { title: "Good night!", subtitle: "How can I help you this evening?" },
    { title: "Evening!", subtitle: "What can I assist you with tonight?" },
    { title: "Good night!", subtitle: "Let's tackle whatever you need." },
    { title: "Working late?", subtitle: "I'm here to help however I can." },
    { title: "Good night!", subtitle: "What brings you here tonight?" }
  ];

  let greetingsArray;
  
  if (hour >= 0 && hour < 5) {
    greetingsArray = earlyMorningGreetings;
  } else if (hour >= 5 && hour < 12) {
    greetingsArray = morningGreetings;
  } else if (hour >= 12 && hour < 17) {
    greetingsArray = afternoonGreetings;
  } else if (hour >= 17 && hour < 21) {
    greetingsArray = eveningGreetings;
  } else {
    greetingsArray = nightGreetings;
  }

  // Return random greeting from the appropriate array
  const randomIndex = Math.floor(Math.random() * greetingsArray.length);
  return greetingsArray[randomIndex];
};

export const getTimeEmoji = () => {
  const hour = new Date().getHours();
  
  if (hour >= 0 && hour < 5) return "🌙";
  if (hour >= 5 && hour < 12) return "🌅";
  if (hour >= 12 && hour < 17) return "☀️";
  if (hour >= 17 && hour < 21) return "🌆";
  return "🌙";
};