import * as React from 'react';

import { LoadingSpinnerProvider } from '../loadingSpinner/LoadingSpinnerContext';
import { ProjectsProvider } from '../projects/ProjectsContext';

interface IAppProvidersProps {
  children: React.ReactNode
}

/**
*
* @returns {JSX.Element | null}
*/
export default function AppProviders(props: IAppProvidersProps): JSX.Element | null {
  return (
    <LoadingSpinnerProvider>
      <ProjectsProvider>
        {props.children}
      </ProjectsProvider>
    </LoadingSpinnerProvider>
  );
}