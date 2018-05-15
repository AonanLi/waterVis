import React from 'react';
import { Select } from 'antd';

import TooltipCard from '../components/TooltipCard';

import { getMeasures } from '../utils/query';
import { LOCATIONS, XUNITS, YEARS } from '../utils/constants';

const Option = Select.Option;

const selectStyle = { width: '80%', marginBottom: '8px' };

const Side = ({ record, onChange }) => {
    const { xUnit, year, locations, selected, measures } = record;
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
            <Select
                value={measures}
                style={selectStyle}
                onChange={v => onChange('measures', v)}
                mode="multiple"
            >
                {getMeasures(record).map((m, i) => (
                    <Option value={m} key={i}>
                        {m}
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
            <Select value={year} style={selectStyle} onChange={v => onChange('year', v)}>
                {YEARS.map((y, i) => (
                    <Option value={y} key={i}>
                        {y}
                    </Option>
                ))}
            </Select>
            <TooltipCard selected={selected} />
        </div>
    );
};

export default Side;
