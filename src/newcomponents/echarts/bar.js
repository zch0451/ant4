import React, {Component} from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import ReactDOM from "react-dom";
import HeaderDropdown from "../../components/HeaderDropdown";

class EchartsTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myChart: null
    }
  }

  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.main);
    this.setState({
      myChart
    })
    this.setChart(this.props, myChart)
    window.addEventListener('resize', myChart.resize, {
      passive: true,
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (JSON.stringify(nextProps) == JSON.stringify(this.props))
      return;
    if (this.state.myChart) {
      this.setChart(nextProps, this.state.myChart)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.myChart.resize);
  }

  setChart(props, myChart) {
    const {data, type, haslegend} = props;
    if (!data) return
    let series = [];
    data.seriesnames.forEach((item, index) => {
        series.push({
          name: item,
          type: type || 'bar',
          data: data.seriesDatas[index],
          smooth: true,
          symbol: 'none',
        })

    })
    let option = {
      legend: {},
      title: data.title || '',
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom:'10',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.xdata,
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: [
        {
          splitLine:{
            show:false
          },
          type: 'value',
          min: 0,
        },
      ],
      series: [
        ...series
      ]
    };
    if (data.color) {
      option.color = data.color;
    }
    if (haslegend) {
      option.legend = {
        data: data.seriesnames,

      }
    }else{
      option.legend.show=false
    }
    // 绘制图表
    myChart.setOption(option);
  }

  render() {
    return (
      <div  ref={node => (this.main = ReactDOM.findDOMNode(node))} style={{width: "100%", height: "100%"}}></div>
    );
  }
}

export default EchartsTest;
