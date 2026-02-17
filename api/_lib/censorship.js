const EXTRA_BLOCKLIST = [
  'nigger',
  'n1gger',
  'nigg3r',
  'n1gg3r',
  'n*gger',
  'niggers',
  'niggerr',
  'asl',
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function looksLikeWord(value) {
  return /^[a-z]+$/i.test(value);
}

export function sanitizeChatMessage(input) {
  let message = String(input || '').trim();
  if (!message) return '';

  for (const blocked of EXTRA_BLOCKLIST) {
    const escaped = escapeRegex(blocked);
    const pattern = looksLikeWord(blocked)
      ? new RegExp(`\\b${escaped}\\b`, 'gi')
      : new RegExp(escaped, 'gi');

    message = message.replace(pattern, (match) => '*'.repeat(match.length));
  }

  return message;
}
