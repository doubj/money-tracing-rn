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

let IconIconRichengBtnTransfer: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M985.750588 490.014118L637.590588 141.854118a45.477647 45.477647 0 0 0-41.562353-6.625883c-11.444706 4.818824-27.105882 15.962353-27.105882 30.117647v172.574118C307.2 387.614118 93.665882 587.896471 30.117647 903.529412a34.334118 34.334118 0 0 0 22.287059 34.635294 45.176471 45.176471 0 0 0 14.155294 2.409412c9.637647 0 12.348235-4.517647 18.371765-12.950589 112.037647-156.912941 274.672941-233.712941 483.689411-240.941176v172.574118c0 12.649412 15.36 23.792941 27.105883 28.611764a37.948235 37.948235 0 0 0 36.743529-6.023529l351.171765-348.16a30.117647 30.117647 0 0 0 2.108235-43.670588z m0 0"
        fill={getIconColor(color, 0, '#3BACFF')}
      />
    </Svg>
  );
};

IconIconRichengBtnTransfer.defaultProps = {
  size: 18,
};

IconIconRichengBtnTransfer = React.memo ? React.memo(IconIconRichengBtnTransfer) : IconIconRichengBtnTransfer;

export default IconIconRichengBtnTransfer;
