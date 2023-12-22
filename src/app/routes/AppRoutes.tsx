import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../../components/pages/home/HomePage';
import PdfPage from '../../components/pages/pdf/PdfPage';

interface IAppRoutesProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
export default function AppRoutes(props: IAppRoutesProps): JSX.Element | null {
  return (
    <Routes>
      <Route path='/pdf' element={<PdfPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<Navigate replace={true} to='/' />} />
    </Routes>
  );
}