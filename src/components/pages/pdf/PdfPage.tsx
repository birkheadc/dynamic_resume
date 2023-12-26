import * as React from 'react';
import './PdfPage.css'
import { Document, PDFViewer, Page, Text, View, Link, BlobProvider } from '@react-pdf/renderer';
import { Resume, ResumeItem, ResumeSection, Website } from '../../../types/resume/resume';
import { ProjectsContext } from '../../../app/contexts/projects/ProjectsContext';
import { LoadingSpinnerContext } from '../../../app/contexts/loadingSpinner/LoadingSpinnerContext';
import { Project } from '../../../types/project/project';
import { generateEnglishResume } from './resumes/english';
import { generateJapaneseResume } from './resumes/japanese';
import { Navigate, useNavigate } from 'react-router-dom';

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
  const { setLoading } = React.useContext(LoadingSpinnerContext);

  const [ resume, setResume ] = React.useState<Resume>(generateResume(projects, language));

  React.useEffect(function showLoadingSpinnerUntilProjectsLoad() {
    setLoading(projects == null);
    if (projects != null) {
      setResume(generateResume(projects, language));
    }
  }, [ projects ]);

  return (
    <main className='pdf-page-wrapper'>
      <BlobProvider document={<GenerateDocument resume={resume} language={language} />}>
        {({ url }) => (
          <PdfOpener url={url} />
        )}
      </BlobProvider>
    </main>
  );
}

function PdfOpener(props: { url: string | null }): JSX.Element | null {
  React.useEffect(function openPdfOnLoad() {
    if (props.url != null) {
      window.location.replace(props.url);
    }
  }, [ props.url ]);

  return null;
}


function GenerateDocument(props: { resume: Resume, language: string }): JSX.Element {
  return (
    <Document>
      <Page style={{ fontFamily: `${props.language}_Primary`, fontSize: '12px' }}>
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

  const resume = props.resume;

  return (
    <View style={{ fontFamily: 'en_Primary', display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <View style={{ paddingBottom: '10px' }}>
        <Text style={{ fontFamily: 'en_Header', fontSize: '36px' }}>{resume.name}</Text>
        <Text style={{ fontSize: '20px' }}>{resume.title}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '12px', width: '100%', padding: '0 10px' }}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text>{`Phone: ${resume.contact.phone}`}</Text>
          <Text>{`Email: ${resume.contact.email}`}</Text>
        </View>
        {pairUpWebsites(resume.contact.websites).map(
        (pair) =>
        <View key={`website-key-${pair[0].url}`} style={{ display: 'flex', flexDirection: 'column' }}>
          <Link style={{ color: '#000000' }} src={pair[0].url}>{pair[0].name}</Link>
          <Link style={{ color: '#000000' }} src={pair[1].url}>{pair[1].name}</Link>
        </View>
      )}
      </View>
    </View>
  );
}

function ResumeIntroductionDisplay(props: { resume: Resume, language: string }): JSX.Element {
  return (
    <View style={{ textAlign: 'justify', padding: '0px 10px', lineHeight: '0.9' }}>
      <Text>{props.resume.introduction}</Text>
    </View>
  );
}

function ResumeSectionDisplay(props: { section: ResumeSection, language: string }): JSX.Element {  
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
                <Text style={{ width: '80px' }}>{`${item.date.from} ~ ${item.date.to ?? 'Present'}`}</Text>
              </View>
            }
            <View style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Text style={{ fontFamily: `${props.language}_Header`, fontSize: '16px' }}>{item.title}</Text>
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
  if (language === 'jp') return generateJapaneseResume(projects);

  return generateEnglishResume(projects);
}

function pairUpWebsites(websites: Website[]): [ Website, Website ][] {
  const pairs: [ Website, Website ][] = websites.reduce(
    (accumulator, _, currentIndex, array) => {
      if (currentIndex % 2 === 0) {
        accumulator.push(array.slice(currentIndex, currentIndex + 2) as never);
      }
      return accumulator;
    }, []);

  return pairs;
}