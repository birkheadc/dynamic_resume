import * as React from 'react';
import { Project } from "../../../types/project/project"
import api from '../../../api';

export const ProjectsContext = React.createContext<Project[] | undefined>(undefined);
export const ProjectsProvider = ({ children }: { children: React.ReactNode} ) => {
  const [ projects, setProjects ] = React.useState<Project[] | undefined>(undefined);
  React.useEffect(() => {
    (async function fetchProjects() {
      const projects = await api.projects.getProjects();
      setProjects(projects);
    })();
  }, []);
  return (
    <ProjectsContext.Provider value={projects} >
      { children }
    </ProjectsContext.Provider>
  );
}