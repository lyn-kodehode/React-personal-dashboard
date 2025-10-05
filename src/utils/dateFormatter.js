export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return "Never";

  const date = new Date(timestamp);
  const now = new Date();
  const minuteDifference = Math.floor((now - date) / (1000 * 60));

  if (minuteDifference < 1) return "Just now";
  if (minuteDifference < 60) return `${minuteDifference}m ago`;
  if (minuteDifference < 1440)
    return `${Math.floor(minuteDifference / 60)}h ago`;

  return date.toLocaleDateString();
};

// Other cases - lastupdated/createdAt
export const formatLastUpdated = (timestamp) => {
  return formatRelativeTime(timestamp) || "Never updated";
};

export const formatCreatedAt = (timestamp) => {
  return formatRelativeTime(timestamp) || "Unknown";
};
