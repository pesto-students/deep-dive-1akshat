# Documentation 📚

## D3 With React

---

## Usage Example

```javascript
import BarChart from '../charts/bar/barchart';

const MyChart = (props) => {
    return (
      <BarChart props={props}/>
    )
}

export default { MyChart };
```

## Supported Props

* **data** - Supports JSON for now.
* **width** - Width of the Graph.(value in pixels)
* **height** - Height of the Graph.(value in pixels)
* **barWidth** - Width of the individual bars.(value in pixels)
* **barColor** - Color of the bars
* **labelKey** - X Axis Key
* **valueKey** - Y Axis Key
* **strokeColor** - X and Y Axis Stroke Colors
* **axisLabelColor** - X and Y Axis Stroke Label Colors
* **strokeWidth** - Width of the X and Y Axis Stokes. (value in pixels)

## Props Passing Usage

```javascript
import BarChart from '../charts/bar/barchart';

const MyChart = (props) => {
    return (
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
    )
}
```

