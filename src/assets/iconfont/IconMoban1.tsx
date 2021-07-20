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

let IconMoban1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M803.7 57H206.3C141.6 57 89 109.1 89 173v664c0 64 52.6 116 117.3 116H825c52.9 0 96-42.3 96-94.4V173c0-63.9-52.6-116-117.3-116zM153 173c0-28.7 23.9-52 53.3-52h597.3c29.4 0 53.3 23.3 53.3 52v92H153v-92z m53.3 716c-29.4 0-53.3-23.3-53.3-52V329h221.7v560H206.3zM857 858.6c0 16.8-14.4 30.4-32 30.4H438.7V329H857v529.6z"
        fill={getIconColor(color, 0, '#3688FF')}
      />
    </Svg>
  );
};

IconMoban1.defaultProps = {
  size: 18,
};

IconMoban1 = React.memo ? React.memo(IconMoban1) : IconMoban1;

export default IconMoban1;
