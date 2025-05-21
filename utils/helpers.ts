// Format date to a readable format (e.g., "May 15, 2025")
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Format time (e.g., "3:45 PM")
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Get relative time description (e.g., "Today", "Yesterday", etc.)
export function getRelativeTimeDescription(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  // Set hours, minutes, seconds and milliseconds to 0 for comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const noteDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (noteDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (noteDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    return formatDate(date);
  }
}