import KeynoteHero from '../components/home/KeynoteHero';
import TracksSection from '../components/home/TracksSection';
import FeaturedSpeakers from '../components/home/FeaturedSpeakers';
import ScheduleHighlights from '../components/home/ScheduleHighlights';

export default function HomePage() {
  return (
    <>
      <KeynoteHero />
      <TracksSection />
      <FeaturedSpeakers />
      <ScheduleHighlights />
    </>
  );
}