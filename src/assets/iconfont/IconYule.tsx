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

let IconYule: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M863.7 803.8c0.2-1.7 0.3-3.4 0.3-5V496c0-106-86-192-192-192H352C246 304 160 390 160 496v309.1l269.9-187.4c49.4-34.3 114.8-34.3 164.2 0 131 90.5 220.9 152.6 269.6 186.1zM140.5 817.7s0.1 0 0.1-0.1l-0.1 0.1zM735 247.8C845.9 275.9 928 376.4 928 496v289.3c0 55.7-38.6 109.4-91.8 72.7-40.9-28.2-125.8-82.2-278.5-187.7-27.4-19.1-63.8-19.1-91.3 0L194.1 858C166 877.5 96 880.8 96 814.1V496C96 376.4 178.1 275.9 289 247.8c-0.6-2.5-1-5.1-1-7.8 0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32h128c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32 0 2.7-0.3 5.3-1 7.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M288 448v-32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32h-32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32v-32h-32c-17.7 0-32-14.3-32-32s14.3-32 32-32h32z"
        fill={getIconColor(color, 1, '#0076FF')}
      />
      <Path
        d="M704 416m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        fill={getIconColor(color, 2, '#0076FF')}
      />
      <Path
        d="M640 480m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        fill={getIconColor(color, 3, '#0076FF')}
      />
      <Path
        d="M704 544m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        fill={getIconColor(color, 4, '#0076FF')}
      />
      <Path
        d="M768 480m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        fill={getIconColor(color, 5, '#0076FF')}
      />
    </Svg>
  );
};

IconYule.defaultProps = {
  size: 18,
};

IconYule = React.memo ? React.memo(IconYule) : IconYule;

export default IconYule;
