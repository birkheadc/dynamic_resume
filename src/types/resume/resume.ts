export type Resume = {
  name: string,
  contact: {
    phone: string,
    email: string,
    websites: Website[],
  },
  introduction: TranslatedItem[],
  sections: {
    education: ResumeItem[],
    career: ResumeItem[],
    projects: ResumeItem[],
    skills: ResumeItem[]
  }
}

export type Website = {
  name: string,
  url: string
}

export type ResumeItem = {
  date?: {
    from: number,
    to?: number
  },
  title: TranslatedItem,
  bulletPoints: TranslatedItem[]
}

export type TranslatedItem = {
  language: string,
  content: string
}