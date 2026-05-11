import sql from './db';

export async function getSavedTalks(userId) {
  const rows = await sql`
    SELECT talk_id FROM saved_talks WHERE user_id = ${userId}
  `;
  return rows.map((r) => r.talk_id);
}

export async function saveTalk(userId, talkId) {
  await sql`
    INSERT INTO saved_talks (user_id, talk_id)
    VALUES (${userId}, ${talkId})
    ON CONFLICT (user_id, talk_id) DO NOTHING
  `;
}

export async function unsaveTalk(userId, talkId) {
  await sql`
    DELETE FROM saved_talks
    WHERE user_id = ${userId} AND talk_id = ${talkId}
  `;
}