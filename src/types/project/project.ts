export class Project {

  id: string = "";
  title: string = "";
  descriptions: {
    shortDescriptions: Description[],
    longDescriptions: Description[],
    bulletPoints: BulletPoint[]
  } = { shortDescriptions: [], longDescriptions: [], bulletPoints: [] };
  technologies: string[] = [];
  site: string = "";
  source: string = "";
  favoriteLevel: number = 0;
  imageUrls: string[] = [];

  static fromJson(json: any): Project[] {
    if (!Array.isArray(json)) {
      return [];
    }
    
    const projects: Project[] = [];
    json.forEach(element => {
      const project: Project = new Project();
      
      project.id = element.id ?? "";
      project.title = element.title ?? "";
      project.descriptions.shortDescriptions = element.descriptions?.shortDescriptions ?? [];
      project.descriptions.longDescriptions = element.descriptions?.longDescriptions ?? [];
      project.descriptions.bulletPoints = element.descriptions?.bulletPoints ?? [];
      project.technologies = element.technologies ?? [];
      project.site = element.site ?? "";
      project.source = element.source ?? "";
      project.favoriteLevel = element.favoriteLevel ?? 0;
      project.imageUrls = element.imageUrls ?? [];
      
      projects.push(project);
    });

    return projects;
  }
}

type Description = {
  language: string,
  content: string
}

type BulletPoint = {
  language: string,
  content: string[]
}