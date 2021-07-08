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

let IconDown: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M193 320.667 515.149 640.851 834 321Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDown.defaultProps = {
  size: 18,
};

IconDown = React.memo ? React.memo(IconDown) : IconDown;

export default IconDown;
