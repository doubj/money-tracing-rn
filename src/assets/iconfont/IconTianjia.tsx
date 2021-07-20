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

let IconTianjia: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M942.6 383.8H640.1V81.3c0-44-36-80-80-80h-96.2c-44 0-80 36-80 80v302.5H81.4c-44 0-80 36-80 80V560c0 44 36 80 80 80h302.5v302.5c0 44 36 80 80 80h96.2c44 0 80-36 80-80V640.1h302.5c44 0 80-36 80-80v-96.2c0-44.1-36-80.1-80-80.1z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTianjia.defaultProps = {
  size: 18,
};

IconTianjia = React.memo ? React.memo(IconTianjia) : IconTianjia;

export default IconTianjia;
