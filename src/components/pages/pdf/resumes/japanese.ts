import { Project } from "../../../../types/project/project";
import { Resume } from "../../../../types/resume/resume";

export function generateJapaneseResume(projects: Project[] | undefined): Resume {
  const resume: Resume = {
    name: "Colby Birkhead",
    contact: {
      phone: '+82-10-6501-5021',
      email: 'birkheadc@gmail.com',
      websites: [
        {
          name: 'birkheadc.me',
          url: 'https://birkheadc.me'
        },
        {
          name: 'linkedin.com/in/colby-birkhead',
          url: 'https://linkedin.com/in/colby-birkhead'
        },
        {
          name: 'github.com/birkheadc',
          url: 'https://github.com/birkheadc'
        },
        {
          name: 'facebook.com/colby.birkhead',
          url: 'https://facebook.com/colby.birkhead'
        }
      ]
    },
    introduction: "日本語",
    sections: []
  }

  return resume;
}