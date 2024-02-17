import * as React from 'react';
import Modal from 'react-modal';
import { createRoot } from 'react-dom/client';

import './src/styles/reset.css';
import './src/styles/vars.css';
import './src/styles/global.css';

import tekoBold from './src/fonts/Teko/static/Teko-SemiBold.ttf';
import teko from './src/fonts/Teko/static/Teko-Regular.ttf';
import abel from './src/fonts/Abel/Abel-Regular.ttf';
// import notoSerifJp from './src/fonts/Noto_Serif_JP/NotoSerifJP-Regular.otf';
import ibmBold from './src/fonts/IBM_Plex_Sans_JP/IBMPlexSansJP-SemiBold.ttf';
import ibm from './src/fonts/IBM_Plex_Sans_JP/IBMPlexSansJP-Medium.ttf';
import ibmReg from './src/fonts/IBM_Plex_Sans_JP/IBMPlexSansJP-Regular.ttf';

import App from './src/app/App';
import { Font } from '@react-pdf/renderer';

// Font.register({ family: 'en_Primary', src: barlow });
// Font.register({ family: 'en_Header', src: anton });
Font.register({ family: 'en_Primary', src: abel });
Font.register({ family: 'en_Header', src: tekoBold });
Font.register({ family: 'en_Header_2', src: teko });
Font.register({ family: 'jp_Primary', src: ibmReg });
Font.register({ family: 'jp_Header', src: ibmBold });
Font.register({ family: 'jp_Header_2', src: ibm });

Font.registerHyphenationCallback(word => {
  if (/[0-9a-zA-Z]/.test(word)) {
    return [word]
  }
  return Array.from(word).flatMap((char) => [char, ''])
})

Modal.setAppElement('#react-root');
Modal.defaultStyles.content = {};
Modal.defaultStyles.overlay = {
  ...Modal.defaultStyles.overlay,
  backgroundColor: 'rgba(0, 0, 0, 0.4)'
};

const container = document.getElementById('react-root');
if (container != null) {
  const root = createRoot(container);
  root.render(<App />);
}