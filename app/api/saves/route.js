import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getSavedTalks, saveTalk, unsaveTalk } from '../../../lib/savedTalks';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ savedIds: [] });

  const savedIds = await getSavedTalks(session.user.id);
  return Response.json({ savedIds });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { talkId, action } = await req.json();
  if (action === 'save') {
    await saveTalk(session.user.id, talkId);
  } else {
    await unsaveTalk(session.user.id, talkId);
  }

  return Response.json({ ok: true });
}