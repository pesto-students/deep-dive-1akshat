import React, { useState, useEffect } from 'react';
import BarChart from '../charts/bar/barchart';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import axios from 'axios';

const Home = () => {
  const [url, setUrl] = useState('https://raw.githubusercontent.com/pesto-students/deep-dive-1akshat/simple-plot-react/react-exercises/simple-plot-react/data/data1.json');
  const [chartData, setChartData] = useState([]);
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(500);
  const [barWidth, setBarWidth] = useState(20);
  const [barColor, setBarColor] = useState('#345c88');
  const [xAxisKey, setXAxisKey] = useState('Letter');
  const [yAxisKey, setYAxisKey] = useState('Freq');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState('2px');
  const [axisLabelColor, setAxisLabelColor] = useState('#000000');

  useEffect(() => {
    fetchData(url);
  }, []);

  const fetchData = (url) => {
    setUrl(url);
    axios.get(url)
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        throw Error('Enter a valid url');
      })

  }

  return (
    <>
      <Row>
        <Col md="4">
          <div className="container props-form-container">
            <h3 style={{ textAlign: 'center' }}>Define the props to update the graph:</h3>
            <Form className="props-form">
              <FormGroup>
                <Label for="data">Data Link</Label>
                <Input type="text" name="data" placeholder="DATA URL" defaultValue={url} onChange={e => fetchData(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="6">
                    <Label for="chartWidth">Chart Width</Label>
                    <Input type="text" name="chartWidth" placeholder="CHART WIDTH IN PIXELS" defaultValue={chartWidth} onChange={e => setChartWidth(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <Label for="chartHeight">Chart Height</Label>
                    <Input type="text" name="chartHeight" placeholder="CHART HEIGHT IN PIXELS" defaultValue={chartHeight} onChange={e => setChartHeight(e.target.value)} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="6">
                    <Label for="barWidth">Bar Width</Label>
                    <Input type="text" name="barWidth" placeholder="BAR WIDTH IN PIXELS" defaultValue={barWidth} onChange={e => setBarWidth(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <Label for="barColor">Bar Color</Label>
                    <Input type="color" name="barColor" placeholder="Bar Color" defaultValue={barColor} onChange={e => setBarColor(e.target.value)} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="6">
                    <Label for="xAxis">X Axis Key</Label>
                    <Input type="text" name="xAxis" placeholder="X Axis Key" defaultValue={xAxisKey} onChange={e => setXAxisKey(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <Label for="YAxis">Y Axis Key</Label>
                    <Input type="text" name="YAxis" placeholder="Y Axis Key" defaultValue={yAxisKey} onChange={e => setYAxisKey(e.target.value)} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="6">
                    <Label for="strokeColor">Stroke Color</Label>
                    <Input type="color" name="strokeColor" placeholder="Stroke Color" defaultValue={strokeColor} onChange={e => setStrokeColor(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <Label for="strokeWidth">Stroke Width</Label>
                    <Input type="text" name="strokeWidth" placeholder="Stroke Width" defaultValue={strokeWidth} onChange={e => setStrokeWidth(e.target.value)} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="6">
                    <Label for="axisLabelColor">Axis Label Color</Label>
                    <Input type="color" name="axisLabelColor" placeholder="Stroke Color" defaultValue={axisLabelColor} onChange={e => setAxisLabelColor(e.target.value)} />
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </div>
        </Col>
        <Col md="8">
          <BarChart
            data={chartData}
            width={chartWidth}
            height={chartHeight}
            barWidth={barWidth}
            barColor={barColor}
            labelKey={xAxisKey}
            valueKey={yAxisKey}
            strokeColor={strokeColor}
            axisLabelColor={axisLabelColor}
            strokeWidth={strokeWidth}
          />
        </Col>

      </Row>
    </>
  );
}

export default Home;
