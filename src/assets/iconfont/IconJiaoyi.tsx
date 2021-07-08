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

let IconJiaoyi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M396.101818 594.385455V424.634182a113.152 113.152 0 0 1 113.105455-113.105455h396.101818V113.338182a113.152 113.152 0 0 0-113.152-113.105455H113.105455A113.152 113.152 0 0 0 0 113.338182v792.157091a113.152 113.152 0 0 0 113.105455 113.105454h678.912a113.152 113.152 0 0 0 113.105454-113.105454V707.490909H509.207273a113.152 113.152 0 0 1-113.105455-113.105454z m565.76-226.397091H509.207273c-31.278545 0-56.552727 25.274182-56.552728 56.552727v169.704727c0 31.278545 25.274182 56.552727 56.552728 56.552727h452.654545c31.278545 0 56.552727-25.274182 56.552727-56.552727V424.680727c0-31.325091-25.274182-56.692364-56.552727-56.692363z m-367.709091 198.004363a56.506182 56.506182 0 0 1-56.599272-56.552727 56.506182 56.506182 0 1 1 113.105454 0c0 31.278545-25.367273 56.552727-56.552727 56.552727z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconJiaoyi.defaultProps = {
  size: 18,
};

IconJiaoyi = React.memo ? React.memo(IconJiaoyi) : IconJiaoyi;

export default IconJiaoyi;
