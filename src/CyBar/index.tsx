import * as echarts from 'echarts';
import { useEffect, useState } from 'react';

import ReactEcharts from 'echarts-for-react';

const BarList = (props) => {
  const [option, setOption] = useState({});
  let { height, yLabel } = props;
  let showLabel = yLabel == 'value' ? '{value}' : '{value} %';

  useEffect(() => {
    const datas = props?.data || [];

    let optionNew = {
      backgroundColor: 'transparent',
      grid: {
        left: '10',
        right: 0,
        bottom: '3%',
        top: '10%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: (value) => '$' + value.toFixed(2),
      },
      xAxis: {
        type: 'category',
        data: datas?.map((item) => item?.name), //数据
        axisLabel: {
          color: 'white',
          formatter: (value) => {
            let a = value.slice(0, 2);
            let b = value.slice(2);
            let c = `${a}\n${b}`;
            return c;
          },
          fontSize: 18,
        },
        axisLine: {
          show: true,
        },
        axisTick: false,
      },
      yAxis: {
        type: 'value',
        axisLine: {
          //坐标轴样式
          show: false, //不显示
        },
        axisLabel: {
          color: 'white',
          formatter: showLabel,
          fontSize: 18,
        },
        splitLine: {
          //分隔辅助线
          lineStyle: {
            type: 'dashed', //线的类型 虚线0
            opacity: 1, //透明度
          },
        },
      },
      series: [
        {
          type: 'pictorialBar',
          symbol: 'rect',
          symbolSize: [40, 3],
          symbolOffset: [0, 0],
          itemStyle: {
            color: '#00BCFF',
          },
          tooltip: { show: false },
          data: datas?.map((item) => item?.value),
        },
        {
          type: 'bar',
          barWidth: 40,
          data: datas?.map((item) => item?.value),
          itemStyle: {
            color: (params, api) => {
              if (params?.data < 0) {
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 1,
                    color: '#00BCFF',
                  },
                  {
                    offset: 0,
                    color: 'rgba(51, 173, 234, 0)',
                  },
                ]);
              } else {
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#00BCFF',
                  },
                  {
                    offset: 1,
                    color: 'rgba(51, 173, 234, 0)',
                  },
                ]);
              }
            },
          },
          label: {
            show: true,
            position: 'top', // 位置
            color: '#fff',
            fontSize: 15,
            distance: 10, // 距离
            // formatter: '{c}%' // 这里是数据展示的时候显示的数据
          },
        },
      ],
    };
    setOption(optionNew);
  }, [props?.name]);

  return <ReactEcharts option={option} theme="Imooc" {...props} />;
};

export default BarList;
