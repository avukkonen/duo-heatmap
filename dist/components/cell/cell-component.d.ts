import React from 'react';
export interface Item {
    label: string;
    value: number | undefined | null;
}
export interface RGB {
    red: number;
    green: number;
    blue: number;
}
export interface Props {
    colors: RGB[];
    id: string;
    highestValue: number;
    item1: Item;
    item2: Item;
}
declare const Cell: React.FC<Props>;
export default Cell;
