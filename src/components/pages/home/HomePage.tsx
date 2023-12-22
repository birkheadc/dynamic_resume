import * as React from 'react';
import './HomePage.css';
import ResumeBuilderForm from './resumeBuilderForm/ResumeBuilderForm';
import { ResumeOptions } from '../../../types/resume/resumeOptions';
import { useNavigate } from 'react-router-dom';

interface IHomePageProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function HomePage(props: IHomePageProps): JSX.Element | null {

  const nav = useNavigate();

  const handleSubmit = (options: ResumeOptions) => {
    let path = '/pdf?'
    Object.entries(options).map(
      entry =>
      path += `${entry[0]}=${entry[1]}&`
    )
    nav(path);
  }

  return (
    <main>
      <h1>Colby Birkhead's Resumes</h1>
      <ResumeBuilderForm submit={handleSubmit} />
    </main>
  );
}

export default HomePage;