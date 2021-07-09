/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconShaixuan from './IconShaixuan';
import IconLeftarrow from './IconLeftarrow';
import IconRightarrow from './IconRightarrow';
import IconZiyuan from './IconZiyuan';
import IconBus from './IconBus';
import IconPhone from './IconPhone';
import IconDrink from './IconDrink';
import IconShopping from './IconShopping';
import IconZhifu from './IconZhifu';
import IconLicai from './IconLicai';
import IconFood from './IconFood';
import IconGongzitiaoicon1X from './IconGongzitiaoicon1X';
import IconYule from './IconYule';
import IconShouru from './IconShouru';
import IconLicai1 from './IconLicai1';
import IconZhangdan from './IconZhangdan';
import IconDown from './IconDown';
import IconMoban from './IconMoban';
import IconJiaoyi from './IconJiaoyi';
import IconZhanghao from './IconZhanghao';
import IconHome from './IconHome';

export type IconNames = 'icon-shaixuan' | 'icon-leftarrow' | 'icon-Rightarrow' | 'icon-ziyuan' | 'icon-Bus' | 'icon-phone' | 'icon-Drink' | 'icon-Shopping' | 'icon-zhifu' | 'icon-licai' | 'icon-food' | 'icon-gongzitiaoicon1x' | 'icon-yule' | 'icon-shouru' | 'icon-licai1' | 'icon-zhangdan' | 'icon-down' | 'icon-moban' | 'icon-jiaoyi' | 'icon-zhanghao' | 'icon-home';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-shaixuan':
      return <IconShaixuan key="1" {...rest} />;
    case 'icon-leftarrow':
      return <IconLeftarrow key="2" {...rest} />;
    case 'icon-Rightarrow':
      return <IconRightarrow key="3" {...rest} />;
    case 'icon-ziyuan':
      return <IconZiyuan key="4" {...rest} />;
    case 'icon-Bus':
      return <IconBus key="5" {...rest} />;
    case 'icon-phone':
      return <IconPhone key="6" {...rest} />;
    case 'icon-Drink':
      return <IconDrink key="7" {...rest} />;
    case 'icon-Shopping':
      return <IconShopping key="8" {...rest} />;
    case 'icon-zhifu':
      return <IconZhifu key="9" {...rest} />;
    case 'icon-licai':
      return <IconLicai key="10" {...rest} />;
    case 'icon-food':
      return <IconFood key="11" {...rest} />;
    case 'icon-gongzitiaoicon1x':
      return <IconGongzitiaoicon1X key="12" {...rest} />;
    case 'icon-yule':
      return <IconYule key="13" {...rest} />;
    case 'icon-shouru':
      return <IconShouru key="14" {...rest} />;
    case 'icon-licai1':
      return <IconLicai1 key="15" {...rest} />;
    case 'icon-zhangdan':
      return <IconZhangdan key="16" {...rest} />;
    case 'icon-down':
      return <IconDown key="17" {...rest} />;
    case 'icon-moban':
      return <IconMoban key="18" {...rest} />;
    case 'icon-jiaoyi':
      return <IconJiaoyi key="19" {...rest} />;
    case 'icon-zhanghao':
      return <IconZhanghao key="20" {...rest} />;
    case 'icon-home':
      return <IconHome key="21" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
