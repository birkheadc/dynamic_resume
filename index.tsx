import * as React from 'react';
import Modal from 'react-modal';
import { createRoot } from 'react-dom/client';

import './src/styles/reset.css';
import './src/styles/vars.css';
import './src/styles/global.css';

import zenAntique from './src/fonts/Zen_Antique/ZenAntique-Regular.ttf';
import kleeOne from './src/fonts/Klee_One/KleeOne-Regular.ttf';

import tekoBold from './src/fonts/Teko/static/Teko-SemiBold.ttf';

import abel from './src/fonts/Abel/Abel-Regular.ttf';

import App from './src/app/App';
import { Font } from '@react-pdf/renderer';

// Font.register({ family: 'en_Primary', src: barlow });
// Font.register({ family: 'en_Header', src: anton });
Font.register({ family: 'en_Primary', src: abel });
Font.register({ family: 'en_Header', src: tekoBold });
Font.register({ family: 'jp_Primary', src: kleeOne });
Font.register({ family: 'jp_Header', src: zenAntique });

Font.registerHyphenationCallback(w => [w]);

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