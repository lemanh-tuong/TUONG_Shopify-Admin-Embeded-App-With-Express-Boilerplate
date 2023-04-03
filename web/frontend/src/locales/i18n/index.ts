import { createGlobalState } from 'react-use';
import { generalEN } from './data/en';
import { generalVI } from './data/vi';
import { createI18n } from './utils/createI18n';

const translations = {
  en: generalEN,
  vi: generalVI,
} as const;

const _i18n = createI18n(translations);

const useGlobalState = createGlobalState([]);

export const i18n = {
  t: _i18n.t,
};

export const useSetLocale = () => {
  const [, listener] = useGlobalState();
  const setLocale = (locale: string) => {
    _i18n.setLocale(locale);
    listener([]);
  };
  return setLocale;
};
