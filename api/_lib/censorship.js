import Filter from 'bad-words';

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

export function sanitizeChatMessage(input) {
  const message = String(input || '').trim();
  if (!message) return '';

  const filter = new Filter({ placeHolder: '*' });
  EXTRA_BLOCKLIST.forEach((word) => filter.addWords(word));
  return filter.clean(message);
}
