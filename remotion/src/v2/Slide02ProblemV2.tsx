import React from 'react';
import { Slide02ProblemOptionA } from './Slide02ProblemOptionA';
import { Slide02ProblemOptionB } from './Slide02ProblemOptionB';
import { Slide02ProblemOptionC } from './Slide02ProblemOptionC';

interface Slide02ProblemV2Props {
  debug?: boolean;
  debugGrid?: boolean;
  debugIds?: boolean;
}

type Slide02Option = 'A' | 'B' | 'C';

const ACTIVE_OPTION: Slide02Option = 'A';

const COMPONENTS_BY_OPTION = {
  A: Slide02ProblemOptionA,
  B: Slide02ProblemOptionB,
  C: Slide02ProblemOptionC,
} as const;

export const Slide02ProblemV2: React.FC<Slide02ProblemV2Props> = (props) => {
  const SelectedSlide = COMPONENTS_BY_OPTION[ACTIVE_OPTION];
  return <SelectedSlide {...props} />;
};
