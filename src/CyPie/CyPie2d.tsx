import { useEffect, useRef } from 'react';

// import styles from './index.module.less';

function PieChart2d(props) {
  console.log(props, 6666);
  const chartRef = useRef(null);
  let datas = {
    data: [
      {
        name: '类型1',
        value: 1314,
      },
      {
        name: '类型2',
        value: 527,
      },
      {
        name: '类型3',
        value: 521,
      },
      {
        name: '类型4',
        value: 27,
      },
      {
        name: '类型5',
        value: 10,
      },
      {
        name: '类型6',
        value: 2,
      },
    ],
    name: '项目',
    height: 300,
    yLabel: 'value',
  };
  useEffect(() => {
    let myChart = echarts.init(chartRef.current);
    let colorList = ['#00F9FF', '#1978E5', '#FFF67C', '#60B45E', '#BECDD0'];
    let colorListShadow = [
      'rgba(25,63,87,1)',
      'rgba(14,39,86,1)',
      'rgba(56,64,63,1)',
      'rgba(94, 225, 204,.3)',
      'rgba(212,224,227,.1)',
    ];
    let data = props.optionsData || datas.data;
    // color: ['#00F9FF', '#1978E5', '#FFF67C', '#60B45E', '#BECDD0'],
    let outData = data.map((item, index) => {
      return {
        value: item.value,
        name: '', //因为不展示label，可不填
        itemStyle: {
          normal: {
            color: item.color || colorListShadow[index],
          },
        },
      };
    });
    let center = ['30%', '50%'];
    let radius = {
      内: ['55%', '60%'],
      pie: ['60%', '75%'],
      外: ['75%', '80%'],
    };

    let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      // grid: {
      //   left: '10',
      //   right: '10%',
      //   bottom: '3%',
      //   top: '10%',
      //   containLabel: true,
      // },
      legend: {
        selectedMode: false,
        orient: 'vertical',
        // left: 'right',
        right: '10%',
        top: 'center',
        align: 'left',
        itemHeight: 16,
        itemWidth: 16,
        textStyle: {
          color: 'white',
          rich: {
            name: {
              color: '#fff',
              fontSize: 18,
              lineHeight: 24,
            },
            value: {
              color: '#fff',
              fontSize: 18,
              lineHeight: 24,
            },
          },
        },
        data: data,
        formatter: function (name) {
          let nameSpace = name?.length < 3 ? name + '   ' : name;
          let value = data?.find((item) => item?.name == name).value;
          let html = `  {name|${nameSpace}}   {value|${value}}`;
          var arr = [html];
          return arr.join('\n');
        },
      },
      series: [
        {
          name: '项目',
          type: 'pie',
          radius: radius['pie'],
          center: center,
          avoidLabelOverlap: false,
          color: colorList,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: '{b}\n\n{c}',
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold',
                color: 'white',
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data,
        },
        {
          name: '内边框',
          type: 'pie',
          tooltip: {
            show: false,
          },
          clockWise: true, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          center, //这里跟上面那组一样即可
          radius: radius['内'], //这里根据自己的需要自行调整
          label: {
            normal: {
              show: false, //重点：此处主要是为了不展示data中的value和name
            },
          },
          data: outData,
        },
        {
          name: '外边框',
          type: 'pie',
          tooltip: {
            show: false,
          },
          clockWise: true, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          center, //这里跟上面那组一样即可
          radius: radius['外'], //这里根据自己的需要自行调整
          label: {
            normal: {
              show: false, //重点：此处主要是为了不展示data中的value和name
            },
          },
          data: outData,
        },
      ],
    };

    // 默认高亮
    let index = 0; // 高亮索引

    myChart.on('finished', function () {
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: index,
        dataIndex: index,
      });
      myChart.on('mouseover', function (e) {
        if (e.dataIndex != index) {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index,
          });
        }
      });
      myChart.on('mouseout', function (e) {
        index = e.dataIndex;
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        });
      });
    });
    myChart.setOption(option);
  }, [props.optionsData]);

  return (
    <div {...props}>
      <div ref={chartRef} style={{ height: props.height || 400 }}></div>
    </div>
  );
}

export default PieChart2d;
