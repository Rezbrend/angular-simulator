import { Preset } from '@primeuix/themes/types';
import { ThemesName } from '../enums/ThemesName';

export interface ITheme {
  name: ThemesName;
  preset: Preset;
}