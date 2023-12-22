import { Project } from "../../types/project/project";
import helpers from "../helpers";

export default async function getProjects(): Promise<Project[]> {
  const url = process.env.PROJECTS_URL + '/projects';
  const { timeout, signal } = helpers.getAbortSignal();
  console.log(`Getting projects from ${url}`);
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: signal
    });
    if (!response.ok) return [];
    const json = await response.json();
    return Project.fromJson(json);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}