import {Box, View, Text} from 'native-base';
import React, {useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dataset} from 'react-native-chart-kit/dist/HelperTypes';
import Svg, {Rect} from 'react-native-svg';

export interface LineCartViewProps {
  xDatas: string[];
  yDatas: number[];
  width: number;
}

const chartConfig = {
  backgroundColor: 'white',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(109, 40, 217, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 0,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#fbfbfb',
  },
};

const LineCartView: React.FC<LineCartViewProps> = React.memo(
  ({xDatas, yDatas, width}) => {
    const [tooltipPos, setTooltipPos] = useState({
      x: 0,
      y: 0,
      visible: false,
      value: 0,
    });

    const decorator = () => {
      return (
        tooltipPos.visible && (
          <Box
            px={2}
            position="relative"
            left={tooltipPos.x - 15}
            top={tooltipPos.y + 10}
            bg="red.400">
            <Text color="white">{tooltipPos.value}</Text>
            {/* <Svg>
              <Rect
                x={tooltipPos.x - 15}
                y={tooltipPos.y + 10}
                width="100%"
                height="30"
                fill="black"
              />
              <Text
                x={tooltipPos.x + 5}
                y={tooltipPos.y + 30}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle">
                {tooltipPos.value}
              </Text>
            </Svg> */}
          </Box>
        )
      );
    };

    const onDataPointClick = (data: {
      index: number;
      value: number;
      dataset: Dataset;
      x: number;
      y: number;
      getColor: (opacity: number) => string;
    }) => {
      const isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;
      isSamePoint
        ? setTooltipPos(previousState => {
            return {
              ...previousState,
              value: data.value,
              visible: !previousState.visible,
            };
          })
        : setTooltipPos({
            x: data.x,
            value: data.value,
            y: data.y,
            visible: true,
          });
    };

    return (
      <LineChart
        data={{
          labels: xDatas,
          datasets: [
            {
              data: yDatas,
            },
          ],
        }}
        width={width}
        height={250}
        yAxisLabel="￥"
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 6,
        }}
        // decorator={decorator}
        // onDataPointClick={onDataPointClick}
      />
    );
  },
);

export default LineCartView;
