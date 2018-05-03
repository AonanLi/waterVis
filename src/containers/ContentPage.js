import React from 'react';
import _ from 'lodash';

import PCAPage from './PCAPage';
import HeatMap from './HeatMap';

const ContentPage = ({ record, onChange }) => {
    const { page, locations } = record;
    if (page === 'PCA') {
        return <PCAPage />;
    }
    if (page === 'HeatMap') {
        return _.map(locations, l => <HeatMap key={l} record={record} location={l} />);
    }
    return false;
};

export default ContentPage;
