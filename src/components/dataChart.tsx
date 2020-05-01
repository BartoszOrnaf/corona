import React from 'react';
import {
  VictoryChart, VictoryLine, VictoryAxis,
} from 'victory';
import { Tag } from 'react-tag-autocomplete';
import { Country } from '../utilities/getData';
import Theme from './chartTheme';
import {
  cyanA400,
  deepPurpleA200,
  teal400,
  lightBlueA700,
  purpleA200,
  lightGreen700,
} from './colors';

interface DataChartProps {
  countries: Country[]
  x: string
  y: string
  tags: Tag[]
  showAll: boolean
  startAtDeaths: boolean
}

interface Selected {
  [key: string]: string
}

const selectedColors = [
  cyanA400,
  deepPurpleA200,
  teal400,
  lightBlueA700,
  purpleA200,
  lightGreen700,
];

const DataChart = ({
  countries, x, y, tags, showAll, startAtDeaths,
}: DataChartProps) => {
  const selected: Selected = {};
  tags.forEach(
    (tag, index) => {
      selected[tag.name] = selectedColors[index];
    },
  );
  return (
    <>
      <VictoryChart
        theme={Theme}
        height={220}
        width={600}
        padding={{
          top: 10,
          bottom: 30,
          left: 70,
          right: 3,
        }}
        domainPadding={{ x: [0, -4], y: [0, 1] }}
        minDomain={{ y: 0 }}
      >
        <VictoryAxis fixLabelOverlap />
        <VictoryAxis dependentAxis />
        {countries.map((country) => {
          if (
            country.name === undefined
            || (!showAll && !Object.keys(selected).includes(country.name))
            || (country.name === 'Global' && !Object.keys(selected).includes(country.name))
          ) {
            return undefined;
          }
          const data = Object.keys(selected).includes(country.name)
            ? {
              stroke: selected[country.name],
              strokeWidth: 1.8,
            }
            : {
              strokeWidth: 1,
            };
          const periods = startAtDeaths
            ? country.periodsWithDeaths.slice(0).reverse()
            : country.periods.slice(0).reverse();
          return (
            <VictoryLine
              key={country.name}
              data={periods}
              interpolation="monotoneX"
              style={{ data }}
              x={startAtDeaths
                ? ''
                : x}
              y={y}
            />
          );
        })}
      </VictoryChart>
    </>
  );
};

export default DataChart;