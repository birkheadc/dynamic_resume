import { Project } from "../../../../types/project/project";
import { Resume } from "../../../../types/resume/resume";

export function generateEnglishResume(projects: Project[] | undefined): Resume {
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
    introduction: 'American expat and small business manager looking to change gears. Developed software for use in production and advertising. Quick and eager to learn new languages and frameworks, driven to apply best practices and write clean code. Skilled at adapting to new and changing environments. Comfortable in many programming languages, as well as natural ones. Fully fluent in Japanese, conversationally fluent in Korean.',
    sections: [
      {
        name: 'education',
        items: [
          {
            date: {
              from: 'Spring 2013',
              to: 'Spring 2017'
            },
            title: 'Nagoya University, Nagoya Japan',
            bulletPoints: [
              "Bachelor's of Arts in Linguistics",
              "Full-ride scholarship student"
            ]
          }
        ]
      },
      {
        name: 'career',
        items: [
          {
            date: {
              from: 'Spring 2017'
            },
            title: 'Retail Manager',
            bulletPoints: [
              "Managed a grocery store focused on foreign clientele in South Korea",
              "Developed applications to assist with daily duties, including a book-keeping application that now automates what used to be over 100 hours of work a year"
            ]
          }
        ]
      },
      {
        name: 'projects',
        items: projects ? projects.slice(0, 3).map(
          project =>
          ({
            title: project.title,
            bulletPoints: project.descriptions.bulletPoints.find(bp => bp.language === 'en')?.content ?? []
          })
        ) : []
      },
      {
        name: 'skills',
        items: [
          {
            title: "Full Stack Web Development",
            bulletPoints: [
              "5+ years experience creating web sites and applications for use in my own and other businesses",
              "Frontend: HTML5, CSS, Java/TypeScript, Node, React, Angular",
              "Backend: C# / ASP.NET, NestJS, Java / Spring, Ruby / Rails",
              "Databases: PostgreSQL, MySQL, SQLite, MongoDB, DynamoDB",
              "Comfortable with many peripheral technologies and services: Linux, Bash, Git, Docker, AWS"
            ]
          },
          {
            title: "Game Development",
            bulletPoints: [
              "Participated in and published to multiple online game jams.",
              "6+ years experience with Unity and Unreal Engine 4",
              "Experience building peer-to-peer as well as dedicated-server architecture"
            ]
          },
          {
            title: "Human Languages",
            bulletPoints: [
              "15+ years Japanese, fully fluent",
              "5+ years Korean, conversationally fluent"
            ]
          }
        ]
      }
    ]
  }

  return resume;
}