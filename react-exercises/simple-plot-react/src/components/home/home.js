import React, { useState, useEffect } from 'react';
import BarChart from '../charts/bar/barchart';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import axios from 'axios';

const Home = () => {
  const [url, setUrl] = useState('https://canvasjs.com/data/gallery/javascript/daily-sales-data.json');
  const [chartData, setChartData] = useState([]);
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(500);
  const [barWidth, setBarWidth] = useState(20);
  const [barColor, setBarColor] = useState('#8B0000');
  const [xAxisKey, setXAxisKey] = useState('date');
  const [yAxisKey, setYAxisKey] = useState('units');


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      setChartData(response.data);
    }
    fetchData();
  }, []);


  return (
    <>
      <Row>
        <Col md="4">
          <div className="container props-form-container">
            <h3 style={{ textAlign: 'center' }}>Define the props to update the graph:</h3>
            <Form className="props-form">
              <FormGroup>
                <Label for="data">Data Link</Label>
                <Input type="text" name="data" placeholder="DATA URL" defaultValue={url} onChange={e => setUrl(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="chartWidth">Chart Width</Label>
                <Input type="text" name="chartWidth" placeholder="CHART WIDTH IN PIXELS" defaultValue={chartWidth} onChange={e => setChartWidth(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="chartHeight">Chart Height</Label>
                <Input type="text" name="chartHeight" placeholder="CHART HEIGHT IN PIXELS" defaultValue={chartHeight} onChange={e => setChartHeight(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="barWidth">Bar Width</Label>
                <Input type="text" name="barWidth" placeholder="BAR WIDTH IN PIXELS" defaultValue={barWidth} onChange={e => setBarWidth(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="barColor">Bar Color</Label>
                <Input type="color" name="barColor" placeholder="Bar Color" defaultValue={barColor} onChange={e => setBarColor(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="xAxis">X Axis Key</Label>
                <Input type="text" name="xAxis" placeholder="X Axis Key" defaultValue={xAxisKey} onChange={e => setXAxisKey(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="YAxis">Y Axis Key</Label>
                <Input type="text" name="YAxis" placeholder="Y Axis Key" defaultValue={yAxisKey} onChange={e => setYAxisKey(e.target.value)} />
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
          />
        </Col>

      </Row>
    </>
  );
}

export default Home;
