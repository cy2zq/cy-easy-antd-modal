import ReactEcharts from 'echarts-for-react';
import { Component } from 'react';

class Index extends Component {
  constructor() {
    super();
    // this.divRef = React.createRef();
    this.resizeObserver = null;
  }

  componentDidMount() {
    const div = this.divRef;
    let main = this.mainRef;
    // 创建一个ResizeObserver实例并定义回调函数
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        main.style.transform = `scale(1.1)`;
        console.log(main, 19);
        // main.style.transform = `scaleX(${width / 800}) scaleY(${height / 500})`;
      }
    });
    // 开始监听div的尺寸变化
    resizeObserver.observe(div);
    this.resizeObserver = resizeObserver;
    const myChart = this.echartRef.getEchartsInstance();
    // 默认高亮
    let index = 0; // 高亮索引
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
  }

  componentWillUnmount() {
    //卸载移除监听
    this.resizeObserver.disconnect();
  }

  getOption() {
    let colorList = ['#00F9FF', '#1978E5', '#FFF67C', '#60B45E', '#BECDD0'];
    let colorListShadow = [
      'rgba(25,63,87,1)',
      'rgba(14,39,86,1)',
      'rgba(56,64,63,1)',
      'rgba(94, 225, 204,.3)',
      'rgba(212,224,227,.1)',
    ];
    let data = this.props.optionsData;
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
    var center = ['30%', '50%'];
    var radius = {
      内: ['55%', '60%'],
      pie: ['60%', '75%'],
      外: ['75%', '80%'],
    };

    let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        itemGap: 30,
        selectedMode: false,
        orient: 'vertical',
        right: 100,
        top: 'center',
        align: 'left',
        itemHeight: 16,
        itemWidth: 16,
        textStyle: {
          color: 'white',
          rich: {
            name: {
              color: '#fff',
              fontSize: 20,
              lineHeight: 24,
            },
            value: {
              color: '#fff',
              fontSize: 20,
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
                color: colorList,
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
    return option;
  }

  onChartClick() {}

  onChartLegendselectchanged() {}

  render() {
    const onEvents = {
      click: this.onChartClick,
      legendselectchanged: this.onChartLegendselectchanged,
    };
    return (
      <div
        ref={(e) => {
          this.divRef = e;
        }}
      >
        <div
          ref={(e) => {
            this.mainRef = e;
          }}
          {...this.props}
        >
          <ReactEcharts
            onEvents={onEvents}
            ref={(e) => {
              this.echartRef = e;
            }}
            option={this.getOption()}
            theme="Imooc"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default Index;
