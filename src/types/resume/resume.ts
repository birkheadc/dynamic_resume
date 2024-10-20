export type Resume = {
  name: string,
  title: string,
  contact: {
    phone: string,
    email: string,
    websites: Website[],
  },
  introduction: string,
  sections: ResumeSection[]
}

export type Website = {
  name: string,
  url: string
}

export type ResumeSection = {
  name: string,
  items: ResumeItem[]
}

export type ResumeItem = {
  date?: {
    from: string,
    to?: string
  },
  title: string,
  site?: string,
  source?: string,
  bulletPoints: string[]
}