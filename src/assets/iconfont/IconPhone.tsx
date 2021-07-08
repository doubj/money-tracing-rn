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

let IconPhone: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M696.2 1000.9H321c-46 0-83.3-37.3-83.3-83.3V103.9c0-46 37.3-83.3 83.3-83.3h375.2c46 0 83.3 37.3 83.3 83.3v813.7c0 46.1-37.3 83.3-83.3 83.3z"
        fill={getIconColor(color, 0, '#9DC6AF')}
      />
      <Path
        d="M692.2 1014.6H325c-55.6 0-100.9-45.3-100.9-100.9V107.9C224.1 52.3 269.4 7 325 7h367.2c55.6 0 100.9 45.3 100.9 100.9v805.8c0 55.6-45.2 100.9-100.9 100.9zM325 34.3c-40.6 0-73.6 33-73.6 73.6v805.8c0 40.6 33 73.6 73.6 73.6h367.2c40.6 0 73.6-33 73.6-73.6V107.9c0-40.6-33-73.6-73.6-73.6H325z"
        fill={getIconColor(color, 1, '#191919')}
      />
      <Path
        d="M237.7 146.1h541.8v672.1H237.7z"
        fill={getIconColor(color, 2, '#FAFCFB')}
      />
      <Path
        d="M779.5 831.8H237.7c-7.5 0-13.6-6.1-13.6-13.6V146.1c0-7.5 6.1-13.6 13.6-13.6h541.8c7.5 0 13.6 6.1 13.6 13.6v672.1c0 7.5-6.1 13.6-13.6 13.6z m-528.1-27.2h514.5V159.7H251.4v644.9z"
        fill={getIconColor(color, 3, '#0F0F0F')}
      />
      <Path
        d="M374.9 431.7m-29.6 0a29.6 29.6 0 1 0 59.2 0 29.6 29.6 0 1 0-59.2 0Z"
        fill={getIconColor(color, 4, '#0F0F0F')}
      />
      <Path
        d="M642.3 431.7m-29.6 0a29.6 29.6 0 1 0 59.2 0 29.6 29.6 0 1 0-59.2 0Z"
        fill={getIconColor(color, 5, '#0F0F0F')}
      />
      <Path
        d="M508.6 547.3c-36.1 0-65.5-28.6-65.5-63.8v-20.1c0-7.5 6.1-13.6 13.6-13.6s13.6 6.1 13.6 13.6v20.1c0 20.2 17.2 36.5 38.3 36.5s38.3-16.4 38.3-36.5v-20.1c0-7.5 6.1-13.6 13.6-13.6s13.6 6.1 13.6 13.6v20.1c0 35.1-29.4 63.8-65.5 63.8zM560.5 90.4H456.8c-7.5 0-13.6-6.1-13.6-13.6s6.1-13.6 13.6-13.6h103.7c7.5 0 13.6 6.1 13.6 13.6s-6.1 13.6-13.6 13.6z"
        fill={getIconColor(color, 6, '#0F0F0F')}
      />
      <Path
        d="M508.6 909.2m-37.9 0a37.9 37.9 0 1 0 75.8 0 37.9 37.9 0 1 0-75.8 0Z"
        fill={getIconColor(color, 7, '#FAFCFB')}
      />
      <Path
        d="M508.6 960.7c-28.4 0-51.5-23.1-51.5-51.5s23.1-51.5 51.5-51.5 51.5 23.1 51.5 51.5-23.1 51.5-51.5 51.5z m0-75.8c-13.4 0-24.3 10.9-24.3 24.3s10.9 24.3 24.3 24.3 24.3-10.9 24.3-24.3-10.9-24.3-24.3-24.3z"
        fill={getIconColor(color, 8, '#0F0F0F')}
      />
    </Svg>
  );
};

IconPhone.defaultProps = {
  size: 18,
};

IconPhone = React.memo ? React.memo(IconPhone) : IconPhone;

export default IconPhone;
