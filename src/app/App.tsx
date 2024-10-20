import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProviders from './contexts/providers/AppProviders';
import AppRoutes from './routes/AppRoutes';

interface IAppProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
export default function App(props: IAppProps): JSX.Element | null {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}