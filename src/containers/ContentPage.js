import React from 'react';
import _ from 'lodash';

import HeatMap from './HeatMap';

const ContentPage = ({ record, onChange }) => {
    const { places } = record;
    return _.map(places, p => <HeatMap key={p} record={record} place={p} />);
};

export default ContentPage;
