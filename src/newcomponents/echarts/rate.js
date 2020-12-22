import React, {Component} from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
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
    const {data} = props;
    if (!data) return
    let series = [];
    let option = {
      color:["#1890ff",'#f5f5f5'],
      legend: {},
      title: data.title || '',
      tooltip: {
        trigger: 'item',
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom:'10',
        containLabel: true
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          hoverAnimation: false,
          label: { show: true, position: 'center' },
          data: [
            {value: data.rate,name:'',  label: {
                formatter: function (params) {
                  return params.percent + '%';
                },
                color: '#333',
                fontSize: 20,
              },},
            {value: 100-data.rate,name:'',},
            ]
        }
      ]
    };
    if (data.color) {
      option.color = data.color;
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
