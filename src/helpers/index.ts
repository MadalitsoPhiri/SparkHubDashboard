/* eslint-disable @typescript-eslint/ban-ts-comment */

import toast, { ToastType } from 'react-hot-toast';

export const notify = (type: ToastType, msg: string) =>
  // @ts-ignore
  toast[type](msg);

export const getInitialsFromName = (name: string) => {
  const nameArray = name?.split(' ') ? name?.split(' ') : [];
  if (!name) return '';
  if (nameArray.length >= 2) {
    const FirstLetter = nameArray[0][0];
    const SecondLetter = nameArray[1][0];
    return FirstLetter.toUpperCase() + SecondLetter.toUpperCase();
  } else {
    const lastLetterIndex = nameArray[0].length - 1;
    const FirstLetter = nameArray[0][0];
    const SecondLetter = nameArray[0][lastLetterIndex];
    return FirstLetter.toUpperCase() + SecondLetter.toUpperCase();
  }
};

export const verifyEmailValidity = (input: any) => {
  return input.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  );
};

export const faviconString = (badge: any) => {
  let svgFavicon =
    '<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">';
  svgFavicon +=
    '<path d="M13.1073 9.00802C12.9251 8.52579 12.5031 7.60781 11.5844 6.8082C10.1087 5.5242 8.4165 5.47263 7.96986 5.47409C7.28718 5.47554 6.0315 5.60481 4.81503 6.46977C3.53393 7.38122 3.03136 8.58752 2.86868 9.03634H4.88547C5.04888 8.75165 5.38441 8.25562 5.98574 7.85182C6.89719 7.2396 7.82606 7.23887 8.17248 7.25703C9.31414 7.31804 10.0651 7.90412 10.3156 8.10529C10.7151 8.42629 10.9758 8.7669 11.1334 9.00802H13.1081H13.1073Z" fill="#242263"/>';
  svgFavicon +=
    '<path d="M3.04081 5.19232C3.04081 5.63824 2.67914 5.99991 2.23395 5.99991C1.9921 5.99991 1.77568 5.89388 1.62825 5.72539L0.329718 4.41741C0.129999 4.26999 0 4.03323 0 3.76597C0 3.32005 0.360947 2.95911 0.806864 2.95911C0.980438 2.95911 1.14166 3.01358 1.27311 3.10726L1.46485 3.29826L2.72634 4.55395L2.86941 4.69629C2.9769 4.83283 3.04081 5.00495 3.04081 5.19232Z" fill="#242263"/>';
  svgFavicon +=
    '<path d="M13.4487 11.892C13.4487 12.3473 13.079 12.717 12.6229 12.717H3.38215C2.92679 12.717 2.55713 12.3473 2.55713 11.892C2.55713 11.4366 2.92679 11.0662 3.38215 11.0662H12.6229C13.079 11.0662 13.4487 11.4359 13.4487 11.892Z" fill="#242263"/>';
  svgFavicon +=
    '<path d="M8.56247 3.39558C8.24728 3.71077 7.736 3.71077 7.42081 3.39558C7.25014 3.22491 7.1717 2.99687 7.18696 2.77318L7.19349 0.929963C7.15645 0.684491 7.23199 0.425219 7.42081 0.236394C7.736 -0.078798 8.24655 -0.078798 8.56174 0.236394C8.68448 0.35913 8.76001 0.511643 8.78688 0.670692V0.941584L8.79124 2.72162V2.92352C8.77091 3.09636 8.69465 3.26267 8.56247 3.39558Z" fill="#242263"/>';
  svgFavicon +=
    '<path d="M13.7668 5.99991C13.3209 5.99991 12.9592 5.63824 12.9592 5.19305C12.9592 4.95121 13.0652 4.73478 13.2337 4.58736L14.5417 3.28882C14.6891 3.08911 14.9259 2.95911 15.1931 2.95911C15.6391 2.95911 16 3.32005 16 3.76597C16 3.93954 15.9455 4.10077 15.8518 4.23222L15.6608 4.42395L14.4052 5.68545L14.2628 5.82852C14.1263 5.936 13.9542 5.99991 13.7668 5.99991Z" fill="#242263"/>';

  if (badge) {
    svgFavicon += '<circle cx="13.5" cy="3" r="2.5" fill="red"></circle>';
  }

  svgFavicon += '</svg>';

  const svgFaviconEncoded = Buffer.from(svgFavicon).toString('base64');
  const svgFaviconWithPrefix = `data:image/svg+xml;base64,${svgFaviconEncoded}`;
  return svgFaviconWithPrefix;
};

export const extractDomain = (url: any) => {
  let domain = url.replace(/^(https?:\/\/)?(www\.)?/i, '');
  domain = domain.split('/')[0];

  return domain;
};
