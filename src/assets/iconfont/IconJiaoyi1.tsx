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

let IconJiaoyi1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M514 926.1c-228.3 0-414-185.7-414-414s185.7-414 414-414 414 185.7 414 414-185.7 414-414 414z m0-771.3c-197 0-357.3 160.3-357.3 357.3S317 869.4 514 869.4s357.3-160.3 357.3-357.3S711 154.8 514 154.8z"
        fill={getIconColor(color, 0, '#3468F7')}
      />
      <Path
        d="M736.5 477.7h-445V421h359l-29.8-22.1 33.7-45.6 98.9 73.2c9.8 7.3 13.9 20 10.1 31.7-3.8 11.7-14.7 19.5-26.9 19.5zM373.6 670.9l-98.9-73.2c-9.8-7.3-13.9-20-10.1-31.7 3.8-11.6 14.7-19.5 26.9-19.5h445v56.7h-359l29.8 22.1-33.7 45.6z"
        fill={getIconColor(color, 1, '#3468F7')}
      />
    </Svg>
  );
};

IconJiaoyi1.defaultProps = {
  size: 18,
};

IconJiaoyi1 = React.memo ? React.memo(IconJiaoyi1) : IconJiaoyi1;

export default IconJiaoyi1;
