import localFont from 'next/font/local';

export const fontSans = localFont({
  src: '../assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const fontMono = localFont({
  src: '../assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const fontEBGaramond = localFont({
  src: [
    {
      path: '../assets/fonts/EBGaramond-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EBGaramond-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/EBGaramond-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EBGaramond-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../assets/fonts/EBGaramond-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EBGaramond-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../assets/fonts/EBGaramond-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EBGaramond-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../assets/fonts/EBGaramond-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EBGaramond-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-eb-garamond',
  weight: '400 800',
  display: 'swap',
});

export const fontOpenSauceOne = localFont({
  src: [
    // Normal styles
    {
      path: '../assets/fonts/open-sauce-one-latin-300-normal.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-800-normal.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-900-normal.woff2',
      weight: '900',
      style: 'normal',
    },
    // Italic styles
    {
      path: '../assets/fonts/open-sauce-one-latin-300-italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-500-italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-600-italic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-700-italic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-800-italic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../assets/fonts/open-sauce-one-latin-900-italic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-open-sauce-one',
  weight: '300 900',
  display: 'swap',
});
