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

let IconEdit: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M462.196364 805.236364l-171.287273-171.287273 454.283636-454.283636c21.876364-21.876364 57.250909-21.876364 79.127273 0l92.16 92.16c21.876364 21.876364 21.876364 57.250909 0 79.127272L462.196364 805.236364z"
        fill={getIconColor(color, 0, '#BBEBA1')}
      />
      <Path
        d="M290.909091 633.483636l-52.130909 215.505455c-1.396364 5.12 3.258182 9.309091 7.912727 7.912727l215.505455-52.130909-171.287273-171.287273z"
        fill={getIconColor(color, 1, '#BBEBA1')}
      />
      <Path
        d="M434.269091 758.690909c-6.050909 0-12.101818-2.327273-16.290909-6.981818-9.309091-9.309091-9.309091-23.738182 0-33.047273l456.610909-456.610909c5.585455-5.585455 8.378182-13.032727 8.378182-20.48s-2.792727-15.36-8.378182-20.48L777.309091 123.810909c-5.585455-5.585455-13.032727-8.378182-20.48-8.378182s-15.36 2.792727-20.48 8.378182L279.272727 580.421818c-9.309091 9.309091-23.738182 9.309091-33.047272 0s-9.309091-23.738182 0-33.047273l456.610909-456.145454c14.429091-14.429091 33.512727-22.341818 53.527272-22.341818 20.48 0 39.563636 7.912727 53.527273 22.341818l96.814546 96.814545c14.429091 14.429091 22.341818 33.512727 22.341818 53.527273 0 20.48-7.912727 39.563636-22.341818 53.527273l-456.61091 456.610909c-3.723636 4.654545-9.774545 6.981818-15.825454 6.981818z"
        fill={getIconColor(color, 2, '#353E43')}
      />
      <Path
        d="M217.367273 810.821818c-7.912727 0-15.36-3.258182-20.945455-8.843636-7.447273-7.447273-10.24-18.152727-7.912727-28.392727l52.130909-215.505455c2.792727-12.567273 15.825455-20.014545 27.927273-17.221818 12.567273 2.792727 20.014545 15.825455 17.221818 27.927273l-45.614546 188.974545 188.974546-45.614545c12.567273-2.792727 25.134545 4.654545 27.927273 17.221818 2.792727 12.567273-4.654545 25.134545-17.221819 27.927272L224.814545 809.890909c-2.792727 0.465455-5.12 0.930909-7.447272 0.930909zM771.723636 399.36c-6.050909 0-12.101818-2.327273-16.290909-6.981818L600.436364 237.381818c-9.309091-9.309091-9.309091-23.738182 0-33.047273s23.738182-9.309091 33.047272 0l154.530909 154.53091c9.309091 9.309091 9.309091 23.738182 0 33.047272-4.654545 5.12-10.705455 7.447273-16.290909 7.447273z"
        fill={getIconColor(color, 3, '#353E43')}
      />
      <Path
        d="M829.905455 948.130909H153.6c-13.032727 0-23.272727-10.24-23.272727-23.272727s10.24-23.272727 23.272727-23.272727h676.305455c13.032727 0 23.272727 10.24 23.272727 23.272727s-10.24 23.272727-23.272727 23.272727z"
        fill={getIconColor(color, 4, '#BBEBA1')}
      />
      <Path
        d="M777.774545 907.170909H101.469091c-13.032727 0-23.272727-10.24-23.272727-23.272727s10.24-23.272727 23.272727-23.272727h676.305454c13.032727 0 23.272727 10.24 23.272728 23.272727s-10.705455 23.272727-23.272728 23.272727z"
        fill={getIconColor(color, 5, '#353E43')}
      />
    </Svg>
  );
};

IconEdit.defaultProps = {
  size: 18,
};

IconEdit = React.memo ? React.memo(IconEdit) : IconEdit;

export default IconEdit;