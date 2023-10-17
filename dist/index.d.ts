import * as React from 'react';
import { Item } from './components/cell/cell-component';
interface DuoHeatmapProps {
    rows: IRow[];
    color1?: string;
    color2?: string;
    steps?: number;
    modifier?: string;
}
export interface IRow {
    label?: string;
    data: ICell[];
}
export interface ICell {
    id: string;
    item1: Item;
    item2: Item;
}
declare const DuoHeatmap: React.FC<DuoHeatmapProps>;
export default DuoHeatmap;
