import React from 'react';
import { Tree, Select } from 'antd';

import { LOCATIONS, XUNITS, YEARS } from '../utils/constants';

const Option = Select.Option;
const TreeNode = Tree.TreeNode;

const selectStyle = { width: '80%', marginBottom: '8px' };

const Side = ({ record, onChange }) => {
    const { xUnit, year, locations } = record;
    return (
        <div>
            <Select
                value={locations}
                style={selectStyle}
                onChange={v => onChange('locations', v)}
                mode="multiple"
            >
                {LOCATIONS.map((l, i) => (
                    <Option value={l} key={i}>
                        {l}
                    </Option>
                ))}
            </Select>
            <Select value={xUnit} style={selectStyle} onChange={v => onChange('xUnit', v)}>
                {XUNITS.map((u, i) => (
                    <Option value={u.value} key={i}>
                        {u.label}
                    </Option>
                ))}
            </Select>
            <Select
                value={year.toString()}
                style={selectStyle}
                onChange={v => onChange('year', parseInt(v, 10))}
            >
                {YEARS.map((y, i) => (
                    <Option value={y} key={i}>
                        {y}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default Side;
