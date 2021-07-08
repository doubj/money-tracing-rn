/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconZhanghao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M723.4304 508.60032c-54.12352 47.74912-125.9776 77.056-205.16352 77.056-80.36352 0-153.40032-30.2592-207.76448-79.42144-126.45376 33.09056-204.69248 146.0736-204.69248 281.04192v68.78208c0 160.96768 812.3904 160.96768 812.3904 0v-68.78208c-0.00512-131.41504-74.21952-242.5088-194.76992-278.67648z m-205.16352 28.12928c140.16512 0 254.09536-109.44 254.09536-244.63872S658.66752 47.21664 518.26688 47.21664c-139.9296 0-253.85472 109.67552-253.85472 244.87424 0 135.20384 113.92512 244.63872 253.85472 244.63872z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZhanghao.defaultProps = {
  size: 18,
};

IconZhanghao = React.memo ? React.memo(IconZhanghao) : IconZhanghao;

export default IconZhanghao;
