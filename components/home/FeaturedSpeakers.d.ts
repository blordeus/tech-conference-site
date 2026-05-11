import type { ReactNode } from 'react';

interface FeaturedSpeakersProps {
  speakers?: any[];
  children?: ReactNode;
}

declare function FeaturedSpeakers(props: FeaturedSpeakersProps): JSX.Element;

export default FeaturedSpeakers;
