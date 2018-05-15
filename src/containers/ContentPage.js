import React from 'react';

import PCAPage from './PCAPage';
import HeatMap from './HeatMap';

const ContentPage = ({ record, onChange }) => {
    const { page } = record;
    if (page === 'PCA') {
        return <PCAPage />;
    }
    if (page === 'HeatMap') {
        return <HeatMap record={record} onChange={onChange} />;
    }
    return false;
};

export default ContentPage;
