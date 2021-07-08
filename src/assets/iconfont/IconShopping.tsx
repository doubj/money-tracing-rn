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

let IconShopping: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M894.138182 728.901818h-600.436364c-10.705455 0-20.48-7.447273-22.807273-18.152727L163.374545 226.210909h-65.163636c-13.032727 0-23.272727-10.24-23.272727-23.272727s10.24-23.272727 23.272727-23.272727h83.781818c10.705455 0 20.48 7.447273 22.807273 18.152727l107.52 484.538182h581.818182c13.032727 0 23.272727 10.24 23.272727 23.272727s-10.705455 23.272727-23.272727 23.272727z"
        fill={getIconColor(color, 0, '#BBEBA1')}
      />
      <Path
        d="M274.618182 315.578182L949.527273 321.163636c13.963636 0 23.738182 13.498182 19.549091 26.996364l-121.018182 381.672727L371.898182 735.418182 274.618182 315.578182z"
        fill={getIconColor(color, 1, '#BBEBA1')}
      />
      <Path
        d="M884.829091 705.629091h-600.436364c-10.705455 0-20.48-7.447273-22.807272-18.152727L154.065455 202.938182h-65.163637c-13.032727 0-23.272727-10.24-23.272727-23.272727s10.24-23.272727 23.272727-23.272728h83.781818c10.705455 0 20.48 7.447273 22.807273 18.152728l107.52 484.538181h581.818182c13.032727 0 23.272727 10.24 23.272727 23.272728s-10.705455 23.272727-23.272727 23.272727z"
        fill={getIconColor(color, 2, '#353E43')}
      />
      <Path
        d="M274.618182 642.327273c-11.636364 0-21.876364-8.843636-23.272727-20.945455-1.396364-12.567273 7.912727-24.203636 20.48-25.6l497.570909-54.458182L865.745455 266.24H302.08c-13.032727 0-23.272727-10.24-23.272727-23.272727s10.24-23.272727 23.272727-23.272728h596.712727c7.447273 0 14.429091 3.723636 19.083637 9.774546 4.189091 6.050909 5.585455 13.963636 2.792727 20.945454l-112.174546 320.232728c-2.792727 8.378182-10.705455 14.429091-19.54909 15.36l-512 55.854545c-0.465455 0.465455-1.396364 0.465455-2.327273 0.465455z"
        fill={getIconColor(color, 3, '#353E43')}
      />
      <Path
        d="M387.258182 810.821818m-64.232727 0a64.232727 64.232727 0 1 0 128.465454 0 64.232727 64.232727 0 1 0-128.465454 0Z"
        fill={getIconColor(color, 4, '#BBEBA1')}
      />
      <Path
        d="M810.821818 810.821818m-64.232727 0a64.232727 64.232727 0 1 0 128.465454 0 64.232727 64.232727 0 1 0-128.465454 0Z"
        fill={getIconColor(color, 5, '#BBEBA1')}
      />
      <Path
        d="M365.381818 851.781818c-34.443636 0-62.836364-28.392727-62.836363-62.836363S330.938182 726.109091 365.381818 726.109091 428.218182 754.501818 428.218182 788.945455 399.825455 851.781818 365.381818 851.781818z m0-79.127273c-8.843636 0-16.290909 7.447273-16.290909 16.29091s7.447273 16.290909 16.290909 16.290909 16.290909-7.447273 16.290909-16.290909-7.447273-16.290909-16.290909-16.29091zM788.945455 851.781818c-34.443636 0-62.836364-28.392727-62.836364-62.836363s28.392727-62.836364 62.836364-62.836364 62.836364 28.392727 62.836363 62.836364-28.392727 62.836364-62.836363 62.836363z m0-79.127273c-8.843636 0-16.290909 7.447273-16.29091 16.29091s7.447273 16.290909 16.29091 16.290909 16.290909-7.447273 16.290909-16.290909-7.447273-16.290909-16.290909-16.29091z"
        fill={getIconColor(color, 6, '#353E43')}
      />
    </Svg>
  );
};

IconShopping.defaultProps = {
  size: 18,
};

IconShopping = React.memo ? React.memo(IconShopping) : IconShopping;

export default IconShopping;