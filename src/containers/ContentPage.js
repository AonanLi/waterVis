import React from 'react';
import _ from 'lodash';

import HeatMap from './HeatMap';

const ContentPage = ({ record, onChange }) => {
    const { locations } = record;
    return _.map(locations, l => <HeatMap key={l} record={record} location={l} />);
};

export default ContentPage;
