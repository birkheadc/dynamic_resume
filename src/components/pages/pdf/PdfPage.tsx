import * as React from 'react';
import './PdfPage.css'
import { Document, Page, Text, View, Link, BlobProvider, Font } from '@react-pdf/renderer';
import { Resume, ResumeSection } from '../../../types/resume/resume';
import { ProjectsContext } from '../../../app/contexts/projects/ProjectsContext';
import { LoadingSpinnerContext } from '../../../app/contexts/loadingSpinner/LoadingSpinnerContext';
import { Project } from '../../../types/project/project';
import { generateEnglishResume } from './resumes/english';
import { generateJapaneseResume } from './resumes/japanese';

interface IPdfPageProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function PdfPage(props: IPdfPageProps): JSX.Element | null {

  const urlParams = new URLSearchParams(window.location.search);
  const language: string = urlParams.get('language') ?? 'en';

  const projects = React.useContext(ProjectsContext);
  const { isLoading, setLoading } = React.useContext(LoadingSpinnerContext);

  const [ resume, setResume ] = React.useState<Resume>(generateResume(projects, language));
  
  registerHyphenationCallback(language);

  React.useEffect(function showLoadingSpinnerUntilProjectsLoad() {
    setLoading(projects == null);
    if (projects != null) {
      setResume(generateResume(projects, language));
    }
  }, [ projects ]);

  return (
    <main className='pdf-page-wrapper'>
      { !isLoading && <BlobProvider document={<GenerateDocument resume={resume} language={language} />}>
        {({ url }) => (
          <PdfOpener url={url} />
        )}
      </BlobProvider>}
    </main>
  );
}

function PdfOpener(props: { url: string | null }): JSX.Element | null {

  React.useEffect(function openPdfOnLoad() {
    if (props.url != null) {
      window.location.replace(props.url);
    }
  }, [ props.url ]);

  return (
    <>{ props.url && <a href={props.url}>Download Colby's Resume</a> }</>
  );
}


function GenerateDocument(props: { resume: Resume, language: string }): JSX.Element {
  const fontSize = props.language === 'en' ? '10px' : '10px';
  
  return (
    <Document>
      <Page style={{ fontFamily: `${props.language}_Primary`, fontSize: fontSize }}>
        <View style={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', color: '#000000', backgroundColor: '#ffffff' }}>
          <ResumeHeaderDisplay resume={props.resume} language={props.language} />
          <ResumeIntroductionDisplay resume={props.resume} language={props.language} />
          <View style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {props.resume.sections.map(
              section =>
              <ResumeSectionDisplay key={`resume-section-key-${section.name}`} section={section} language={props.language} />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

function ResumeHeaderDisplay(props: { resume: Resume, language: string }): JSX.Element {

  const {resume, language} = props;

  return (
    <View style={{ fontFamily: 'en_Primary', display: 'flex', flexDirection: 'row', gap: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Text style={{ fontFamily: 'en_Header', fontSize: '36px', lineHeight: '1' }}>{resume.name}</Text>
        <Text style={{ fontFamily: `${language}_Header_2`, fontSize: '18px' }}>{resume.title}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '12px', gap: '20px' }}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text>{`Phone: ${resume.contact.phone}`}</Text>
          <Text>{`Email: ${resume.contact.email}`}</Text>
          <Link style={{ color: '#000000' }} src={resume.contact.websites[0].url}>{resume.contact.websites[0].name}</Link>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: '#000000' }} src={resume.contact.websites[1].url}>{resume.contact.websites[1].name}</Link>
          <Link style={{ color: '#000000' }} src={resume.contact.websites[2].url}>{resume.contact.websites[2].name}</Link>
          <Link style={{ color: '#000000' }} src={resume.contact.websites[3].url}>{resume.contact.websites[3].name}</Link>
        </View>
      </View>
    </View>
  );
}

function ResumeIntroductionDisplay(props: { resume: Resume, language: string }): JSX.Element {
  return (
    <View style={{ textAlign: 'justify', padding: '0px 10px', lineHeight: `${props.language === 'en' ? 0.9 : 1.0}` }}>
      <Text>{props.resume.introduction}</Text>
    </View>
  );
}

function ResumeSectionDisplay(props: { section: ResumeSection, language: string }): JSX.Element {

  const present = props.language === 'en' ? 'Present' : '現在';

  return (
    <View style={{ padding: '0px 10px' }}>
      <View>
        <Text style={{ fontFamily: `${props.language}_Header`, textTransform: 'capitalize', fontSize: '20px' }}>{props.section.name}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {props.section.items.map(
          item =>
          <View key={`resume-section-item-key-${item.title}`} style={{ paddingLeft: '30px', display: 'flex', flexDirection: 'row', gap: '10px'}}>
            {item.date && 
              <View>
                <Text style={{ width: '80px' }}>{`${item.date.from} ~ ${item.date.to ?? present}`}</Text>
              </View>
            }
            <View style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
                <Text style={{ fontFamily: `${props.language}_Header_2`, fontSize: '16px', textTransform: 'capitalize' }}>{item.title}</Text>
                {item.site && <Link style={{ color: '#000000' }} src={item.site}>{item.site}</Link>}
              </View>
              {item.bulletPoints.map(
                bp =>
                <Text key={`resume-section-item-bullet-point-key-${bp}`} style={{ paddingLeft: '15px', marginLeft: '5px', textIndent: '-7px' }}>&#x2022; {bp}</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

function generateResume(projects: Project[] | undefined, language: string): Resume {
  // Please forgive me for I have sinned
  if (language === 'en') return generateEnglishResume(projects);
  if (language === 'ja') return generateJapaneseResume(projects);

  return generateEnglishResume(projects);
}

function registerHyphenationCallback(language: string) {

  // const languagesWithoutSpaces = [
  //   'jp'
  // ]

  // if (languagesWithoutSpaces.includes(language)) {
  //   Font.registerHyphenationCallback((word) =>
  //     Array.from(word).flatMap((char) => [char, ''])
  //   );
  //   return;
  // }

  // Font.registerHyphenationCallback(w => [w]);
}