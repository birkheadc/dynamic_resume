import { Project } from "../../../../types/project/project";
import { Resume } from "../../../../types/resume/resume";

export function generateJapaneseResume(projects: Project[] | undefined): Resume {
  const resume: Resume = {
    name: "Colby Birkhead",
    title: "ウェブ開発・フルスタック",
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
    introduction: '中小企業経営者かつウェブ開発者。POSシステムのソフトウェアやダッシュボードを開発しています。新しい言語やフレームワークを素早く学び、ベストプラクティスを適用し、メンテナンスしやすいコードの実現に努めています。新しい環境に適応することを得意としています。多くのプログラミング言語に加えて、自然言語も習得しています。英語と日本語は流暢で、韓国語は会話レベルです',
    sections: [
      {
        name: '学歴',
        items: [
          {
            date: {
              from: '2013年',
              to: '2017年'
            },
            title: '名古屋大学',
            bulletPoints: [
              "文学部卒業",
              "文部科学省による全額奨学金受給者"
            ]
          }
        ]
      },
      {
        name: '職歴',
        items: [
          {
            date: {
              from: '2024年',
            },
            title: "ウェブ開発",
            bulletPoints: [
              "小規模企業のためのソーシャルメディア管理・分析ツールの開発",
              "GoogleやInstagramなどのサードパーティAPIと連携",
              "新機能を導入し、ユーザーの参加を倍に増加", 
              "長年にわたるバグを修正し、販売スタッフと顧客の不快を解消"
            ]
          },
          {
            date: {
              from: '2017年',
              to: '2024年'
            },
            title: '小売店店主',
            bulletPoints: [
              "外国人向けスーパーの経営",
              "日常業務支援のためのアプリケーションを開発し、その中、かつて毎年100時間以上かかっていた作業を自動化する簿記アプリケーションも含まれる"
            ]
          }
        ]
      },
      {
        name: 'プロジェクト',
        items: projects ? projects.sort((a, b) => b.resumeFavoriteLevel - a.resumeFavoriteLevel).slice(0, 2).map(
          project =>
          ({
            title: project.title,
            bulletPoints: project.descriptions.bulletPoints.find(bp => bp.language === 'ja')?.content ?? [],
            site: project.site,
            source: project.source
          })
        ) : []
      },
      {
        name: 'スキル',
        items: [
          {
            title: "ウェブ開発・フルスタック",
            bulletPoints: [
              "社内アプリや広告ウェブサイト開発の経験5年以上",
              "フロント: HTML5, CSS, Java/TypeScript, Node, React, Angular",
              "バック: C# / ASP.NET, NestJS, Java / Spring, Ruby / Rails",
              "データベース: PostgreSQL, MySQL, SQLite, MongoDB, DynamoDB",
              "多くの周辺技術やサービスに精通しています: Linux, Bash, Git, Docker, AWS"
            ]
          },
          {
            title: "ゲーム開発",
            bulletPoints: [
              "itch.ioでゲームジャムに参加してゲームを公開している",
              "UnityとUnreal 4/5の経験6年以上",
              "P2Pおよび専用サーバーのマルチプレイヤーを構築している"
            ]
          },
          {
            title: "言語",
            bulletPoints: [
              "英語母語者・日本語15年以上",
              "韓国語5年以上"
            ]
          }
        ]
      }
    ]
  }

  return resume;
}