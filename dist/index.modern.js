import React__default, { useState, useEffect, createElement } from 'react';

var styles = {"row":"_1EzKq","rowLabel":"_1D2H3","rowData":"_2xyGV"};

var Row = function Row(props) {
  var label = props.label,
    children = props.children;
  return React__default.createElement("div", {
    "data-testid": 'row',
    className: styles.row
  }, label ? React__default.createElement("div", {
    "data-testid": 'label',
    className: styles.rowLabel
  }, label) : null, React__default.createElement("div", {
    "data-testid": 'row-data',
    className: styles.rowData
  }, children));
};

var styles$1 = {"cell":"_fxmnj","cellData":"_3egf4","cellItem":"_36YU9","cellItemLabel":"_ApSI-","cellItemValue":"_3vYDg"};

var Cell = function Cell(props) {
  var id = props.id,
    item1 = props.item1,
    item2 = props.item2,
    colors = props.colors,
    highestValue = props.highestValue;
  var stepAmount = colors.length;
  var value1 = item1.value || 0;
  var value2 = item2.value || 0;
  var cellMaxValue = value1 + value2;
  var ratio = 1 - value1 / cellMaxValue;
  var colorIndex = Math.round(ratio * stepAmount) - 1;
  if (colorIndex < 0) {
    colorIndex = 0;
  }
  var alpha = 1 / (highestValue / cellMaxValue);
  var cellColor = cellMaxValue ? colors[colorIndex] : {
    red: 255,
    green: 255,
    blue: 255
  };
  return React__default.createElement("div", {
    "data-testid": 'cell',
    id: id,
    className: styles$1.cell,
    style: {
      backgroundColor: "rgba(" + cellColor.red + ", " + cellColor.green + ", " + cellColor.blue + ", " + (cellMaxValue ? alpha : 1) + ")"
    }
  }, cellMaxValue ? React__default.createElement("div", {
    role: 'tooltip',
    id: 'tooltip-' + id,
    "data-testid": 'tooltip',
    className: styles$1.cellData
  }, React__default.createElement("div", {
    className: styles$1.cellItem
  }, React__default.createElement("span", {
    className: styles$1.cellItemLabel
  }, item1.label), React__default.createElement("span", {
    className: styles$1.cellItemValue
  }, value1)), React__default.createElement("div", {
    className: styles$1.cellItem
  }, React__default.createElement("span", {
    className: styles$1.cellItemLabel
  }, item2.label), React__default.createElement("span", {
    className: styles$1.cellItemValue
  }, value2))) : null);
};

var DuoHeatmap = function DuoHeatmap(props) {
  var modifier = props.modifier,
    rows = props.rows,
    color1 = props.color1,
    color2 = props.color2,
    steps = props.steps;
  var _React$useState = useState(-1),
    highestValue = _React$useState[0],
    setHighestValue = _React$useState[1];
  var stepsAmount = steps || 10;
  var firstColor = color1 || '#ffffff';
  var secondColor = color2 || '000000';
  useEffect(function () {
    var dataHighestValue = 0;
    for (var r = 0; r < rows.length; r++) {
      var currentRow = rows[r];
      var rowHighest = 0;
      for (var c = 0; c < currentRow.data.length; c++) {
        var value1 = currentRow.data[c].item1.value ? currentRow.data[c].item1.value : 0;
        var value2 = currentRow.data[c].item2.value ? currentRow.data[c].item2.value : 0;
        var currentCellValue = value1 + value2;
        if (currentCellValue > rowHighest) rowHighest = currentCellValue;
      }
      if (rowHighest > dataHighestValue) dataHighestValue = rowHighest;
    }
    setHighestValue(dataHighestValue);
  }, [highestValue]);
  var interpolateHexColorsToRGB = function interpolateHexColorsToRGB(color1, color2, steps) {
    var c1R = parseInt(color1.slice(1, 3), 16);
    var c1G = parseInt(color1.slice(3, 5), 16);
    var c1B = parseInt(color1.slice(5, 7), 16);
    var c2R = parseInt(color2.slice(1, 3), 16);
    var c2G = parseInt(color2.slice(3, 5), 16);
    var c2B = parseInt(color2.slice(5, 7), 16);
    var diffR = c2R - c1R;
    var diffG = c2G - c1G;
    var diffB = c2B - c1B;
    var interpolatedColors = [];
    for (var i = 0; i < steps; i++) {
      var ratio = i / (steps - 1);
      var r = Math.round(c1R + ratio * diffR);
      var g = Math.round(c1G + ratio * diffG);
      var b = Math.round(c1B + ratio * diffB);
      interpolatedColors.push({
        red: r,
        green: g,
        blue: b
      });
    }
    return interpolatedColors;
  };
  var rgbColors = interpolateHexColorsToRGB(firstColor, secondColor, stepsAmount);
  return createElement("div", {
    "data-testid": 'duo-heatmap',
    className: "duo-heatmap " + (modifier ? 'duo-heatmap--' + modifier : '')
  }, rows.map(function (row, index) {
    return createElement(Row, {
      label: row.label,
      key: 'row-' + index
    }, highestValue === -1 ? null : row.data.map(function (cell) {
      return createElement(Cell, {
        id: cell.id,
        key: cell.id,
        highestValue: highestValue,
        colors: rgbColors,
        item1: cell.item1,
        item2: cell.item2
      });
    }));
  }));
};

export default DuoHeatmap;
//# sourceMappingURL=index.modern.js.map
