import { GetSetting, SaveSetting, getSetting, saveSetting } from './setting';

export const internalServices = {
  setting: {
    getSetting,
    saveSetting,
  },
};

export type { GetSetting, SaveSetting };
