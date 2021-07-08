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

let IconGongzitiaoicon1X: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 0m102.4 0l819.2 0q102.4 0 102.4 102.4l0 819.2q0 102.4-102.4 102.4l-819.2 0q-102.4 0-102.4-102.4l0-819.2q0-102.4 102.4-102.4Z"
        fill={getIconColor(color, 0, '#D85C62')}
      />
      <Path
        d="M327.68 368.64h327.68v317.44H327.68z"
        fill={getIconColor(color, 1, '#F9B3B7')}
      />
      <Path
        d="M554.5 469.76l42.84-42.84-33.9-33.96-61.86 61.86-61.86-61.86-33.96 33.96 42.84 42.84h-62.04v48h91.2v43.2h-91.2v48h91.2v52.8h48v-52.8h91.2v-48h-91.2v-43.2h91.2v-48H554.5z m254.46 134.4v153.6h-614.4v-153.6c42.42 0 76.8-34.38 76.8-76.8 0-42.42-34.38-76.8-76.8-76.8v-153.6h614.4v153.6c-42.42 0-76.8 34.38-76.8 76.8 0 42.42 34.38 76.8 76.8 76.8z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconGongzitiaoicon1X.defaultProps = {
  size: 18,
};

IconGongzitiaoicon1X = React.memo ? React.memo(IconGongzitiaoicon1X) : IconGongzitiaoicon1X;

export default IconGongzitiaoicon1X;
