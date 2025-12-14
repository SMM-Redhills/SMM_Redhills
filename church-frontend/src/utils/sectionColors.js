// Centralized section background colors for consistent theming across the project
export const sectionColors = {
  // Light colors for better readability
  lightBlue: '#f0f9ff',
  lightYellow: '#fef3c7', 
  lightGreen: '#f0fdf4',
  lightPink: '#fdf2f8',
  lightPurple: '#f3e8ff',
  lightOrange: '#fff7ed',
  lightTeal: '#f0fdfa',
  lightIndigo: '#eef2ff',
  lightRose: '#fff1f2',
  lightEmerald: '#ecfdf5',
  lightAmber: '#fffbeb',
  lightCyan: '#ecfeff',
  lightViolet: '#faf5ff',
  lightLime: '#f7fee7',
  lightSky: '#f0f9ff',
  lightGray: '#f9fafb'
};

// Function to get section color by index (cycles through colors)
export const getSectionColor = (index) => {
  const colors = Object.values(sectionColors);
  return colors[index % colors.length];
};

// Predefined section assignments for consistency
export const assignedColors = {
  hero: sectionColors.lightBlue,
  church: sectionColors.lightBlue,
  quickLinks: sectionColors.lightYellow,
  history: sectionColors.lightGreen,
  schedule: sectionColors.lightPink,
  aboutSaint: sectionColors.lightPurple,
  gallery: sectionColors.lightOrange,
  news: sectionColors.lightTeal,
  events: sectionColors.lightIndigo,
  prayers: sectionColors.lightRose,
  contact: sectionColors.lightEmerald,
  about: sectionColors.lightAmber,
  services: sectionColors.lightCyan,
  testimonials: sectionColors.lightViolet,
  footer: sectionColors.lightLime
};