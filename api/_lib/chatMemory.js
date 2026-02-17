const ONLINE_WINDOW_MS = 5 * 60 * 1000;

function initStore() {
  return {
    usersById: new Map(),
    usersByNorm: new Map(),
    messages: [],
    events: [],
    nextUserId: 1,
    nextMessageId: 1,
    nextEventId: 1,
  };
}

function normalizeNow() {
  return new Date().toISOString();
}

export function getChatMemoryStore() {
  if (!globalThis.__khizarChatMemoryStore) {
    globalThis.__khizarChatMemoryStore = initStore();
  }
  return globalThis.__khizarChatMemoryStore;
}

export function upsertMemoryUser(usernameNorm, username) {
  const store = getChatMemoryStore();
  const existingId = store.usersByNorm.get(usernameNorm);
  const now = normalizeNow();

  if (existingId) {
    const existing = store.usersById.get(existingId);
    if (existing) {
      existing.username = username;
      existing.last_seen_at = now;
      return existing;
    }
  }

  const user = {
    id: store.nextUserId++,
    username,
    username_norm: usernameNorm,
    role: 'user',
    created_at: now,
    last_seen_at: now,
  };

  store.usersById.set(user.id, user);
  store.usersByNorm.set(usernameNorm, user.id);
  return user;
}

export function getMemoryUserById(id) {
  const store = getChatMemoryStore();
  return store.usersById.get(Number(id));
}

export function touchMemoryUser(id) {
  const user = getMemoryUserById(id);
  if (!user) return null;
  user.last_seen_at = normalizeNow();
  return user;
}

export function addMemoryMessage({ userId, username, body, isBot = false }) {
  const store = getChatMemoryStore();
  const message = {
    id: store.nextMessageId++,
    user_id: Number(userId),
    username,
    body,
    is_bot: Boolean(isBot),
    created_at: normalizeNow(),
  };
  store.messages.push(message);
  return message;
}

export function addMemoryEvent({ eventType, userId = null, payload = null }) {
  const store = getChatMemoryStore();
  const event = {
    id: store.nextEventId++,
    event_type: eventType,
    user_id: userId === null ? null : Number(userId),
    payload,
    created_at: normalizeNow(),
  };
  store.events.push(event);
  return event;
}

export function listMemoryMessages(limit = 300) {
  const store = getChatMemoryStore();
  return store.messages.slice(Math.max(store.messages.length - limit, 0));
}

export function listMemoryEventsSince(sinceEventId = 0, limit = 100) {
  const store = getChatMemoryStore();
  return store.events
    .filter((event) => event.id > Number(sinceEventId || 0))
    .slice(0, limit);
}

export function countMemoryOnlineUsers() {
  const store = getChatMemoryStore();
  const now = Date.now();
  let count = 0;
  for (const user of store.usersById.values()) {
    const seenAt = new Date(user.last_seen_at).getTime();
    if (Number.isFinite(seenAt) && now - seenAt <= ONLINE_WINDOW_MS) {
      count += 1;
    }
  }
  return count;
}

export function getMemoryAdminOverview() {
  const store = getChatMemoryStore();

  const messageCounts = new Map();
  for (const message of store.messages) {
    const prev = messageCounts.get(message.user_id) || 0;
    messageCounts.set(message.user_id, prev + 1);
  }

  const users = [...store.usersById.values()]
    .map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role || 'user',
      lastSeenAt: user.last_seen_at,
      messageCount: messageCounts.get(user.id) || 0,
    }))
    .sort((a, b) => b.messageCount - a.messageCount || a.username.localeCompare(b.username));

  const messages = [...store.messages]
    .slice(-200)
    .map((message) => ({
      id: message.id,
      username: message.username,
      body: message.body,
      isBot: Boolean(message.is_bot),
      createdAt: message.created_at,
    }))
    .reverse();

  return {
    stats: {
      totalUsers: store.usersById.size,
      totalMessages: store.messages.length,
      onlineUsers: countMemoryOnlineUsers(),
    },
    users,
    messages,
  };
}
