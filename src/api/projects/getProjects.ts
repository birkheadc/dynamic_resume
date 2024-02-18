import { Project } from "../../types/project/project";
import helpers from "../helpers";

export default async function getProjects(): Promise<Project[]> {
  const url = process.env.PROJECTS_URL + '/projects';
  const { timeout, signal } = helpers.getAbortSignal();
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: signal
    });
    if (!response.ok) return [];
    const json = await response.json();
    const projects: Project[] = Project.fromJson(json);
    console.log({projects});
    return projects;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}