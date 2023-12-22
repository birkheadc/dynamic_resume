import * as React from 'react';
import './ResumeBuilderForm.css'
import { DEFAULT_RESUME_OPTIONS, ResumeOptions } from '../../../../types/resume/resumeOptions';

interface IResumeBuilderFormProps {
  submit: (options: ResumeOptions) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ResumeBuilderForm(props: IResumeBuilderFormProps): JSX.Element | null {

  const [ resumeOptions, setResumeOptions ] = React.useState<ResumeOptions>(DEFAULT_RESUME_OPTIONS);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.submit(resumeOptions);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <select>
        <option value={"en"}>English</option>
        <option value={"jp"}>日本語</option>
      </select>
      <button type='submit'>Submit</button>
    </form>
  );
}