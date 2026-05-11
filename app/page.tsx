import KeynoteHero from '../components/home/KeynoteHero';
import TracksSection from '../components/home/TracksSection';
import FeaturedSpeakers from '../components/home/FeaturedSpeakers';
import ScheduleHighlights from '../components/home/ScheduleHighlights';
import {
  getConferenceInfo,
  getKeynote,
  getTracks,
  getFeaturedSpeakers,
  getTalks,
  getTrackById,
  getEnrichedHighlightedTalks,
} from '../lib/data';

export default async function HomePage() {
  const [conf, keynote, tracks, featuredSpeakers, allTalks, highlights] =
    await Promise.all([
      getConferenceInfo(),
      getKeynote(),
      getTracks(),
      getFeaturedSpeakers(),
      getTalks(),
      getEnrichedHighlightedTalks(),
    ]);

  // Enrich featured speakers with their talk + track color
  const talkBySpeaker = Object.fromEntries(allTalks.map((t) => [t.speakerId, t]));
  const enrichedSpeakers = await Promise.all(
    featuredSpeakers.map(async (speaker) => {
      const talk = talkBySpeaker[speaker.id] ?? null;
      const track = talk ? await getTrackById(talk.trackId) : null;
      return { ...speaker, talk: talk ? { ...talk, track } : null };
    })
  );

  return (
    <>
      <KeynoteHero conf={conf} keynote={keynote} />
      <TracksSection tracks={tracks} />
      <FeaturedSpeakers speakers={enrichedSpeakers} />
      <ScheduleHighlights talks={highlights} />
    </>
  );
}