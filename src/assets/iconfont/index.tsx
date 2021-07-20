/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconJiaoyi1 from './IconJiaoyi1';
import IconMoban1 from './IconMoban1';
import IconTianjia from './IconTianjia';
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

export type IconNames = 'icon-jiaoyi1' | 'icon-moban1' | 'icon-tianjia' | 'icon-shaixuan' | 'icon-leftarrow' | 'icon-Rightarrow' | 'icon-ziyuan' | 'icon-Bus' | 'icon-phone' | 'icon-Drink' | 'icon-Shopping' | 'icon-zhifu' | 'icon-licai' | 'icon-food' | 'icon-gongzitiaoicon1x' | 'icon-yule' | 'icon-shouru' | 'icon-licai1' | 'icon-zhangdan' | 'icon-down' | 'icon-moban' | 'icon-jiaoyi' | 'icon-zhanghao' | 'icon-home';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-jiaoyi1':
      return <IconJiaoyi1 key="1" {...rest} />;
    case 'icon-moban1':
      return <IconMoban1 key="2" {...rest} />;
    case 'icon-tianjia':
      return <IconTianjia key="3" {...rest} />;
    case 'icon-shaixuan':
      return <IconShaixuan key="4" {...rest} />;
    case 'icon-leftarrow':
      return <IconLeftarrow key="5" {...rest} />;
    case 'icon-Rightarrow':
      return <IconRightarrow key="6" {...rest} />;
    case 'icon-ziyuan':
      return <IconZiyuan key="7" {...rest} />;
    case 'icon-Bus':
      return <IconBus key="8" {...rest} />;
    case 'icon-phone':
      return <IconPhone key="9" {...rest} />;
    case 'icon-Drink':
      return <IconDrink key="10" {...rest} />;
    case 'icon-Shopping':
      return <IconShopping key="11" {...rest} />;
    case 'icon-zhifu':
      return <IconZhifu key="12" {...rest} />;
    case 'icon-licai':
      return <IconLicai key="13" {...rest} />;
    case 'icon-food':
      return <IconFood key="14" {...rest} />;
    case 'icon-gongzitiaoicon1x':
      return <IconGongzitiaoicon1X key="15" {...rest} />;
    case 'icon-yule':
      return <IconYule key="16" {...rest} />;
    case 'icon-shouru':
      return <IconShouru key="17" {...rest} />;
    case 'icon-licai1':
      return <IconLicai1 key="18" {...rest} />;
    case 'icon-zhangdan':
      return <IconZhangdan key="19" {...rest} />;
    case 'icon-down':
      return <IconDown key="20" {...rest} />;
    case 'icon-moban':
      return <IconMoban key="21" {...rest} />;
    case 'icon-jiaoyi':
      return <IconJiaoyi key="22" {...rest} />;
    case 'icon-zhanghao':
      return <IconZhanghao key="23" {...rest} />;
    case 'icon-home':
      return <IconHome key="24" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
