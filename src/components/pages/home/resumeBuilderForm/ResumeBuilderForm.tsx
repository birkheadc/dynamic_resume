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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setResumeOptions(o => {
      const newValue = {...o};
      newValue[name] = value;
      return newValue;
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.submit(resumeOptions);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className='language-container'>
        <label htmlFor='language'>Language</label>
        <select id='language' name='language' value={resumeOptions.language} onChange={handleChange}>
          <option value={"en"}>English</option>
          <option value={"jp"}>日本語</option>
        </select>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}