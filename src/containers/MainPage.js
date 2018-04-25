import React, { Component } from "react";
import _ from "lodash";

import HeatMap from "../components/HeatMap";

import json from "../util/data.json";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allPlace: false,
            place: "Achara",
            dateUnit: "year",
            date: 2017
        };
    }

    componentDidMount() {
        const formatted = json.results.map(r =>
            _.mapKeys(r, (value, i) => (i === "sample date" ? "sampleDate" : i))
        );
        const groupLocation = _.groupBy(formatted, r => r.location);
        const data = _.reduce(
            groupLocation,
            (result, value, key) => ({
                ...result,
                [key]: _.reduce(
                    _.groupBy(value, v => v.sampleDate),
                    (r, v, k) => ({
                        ...r,
                        [k]: _.groupBy(v, val => val.measure)
                    }),
                    {}
                )
            }),
            {}
        );
        const measures = _.reduce(
            groupLocation,
            (result, value, key) => ({
                ...result,
                [key]: _.reduce(
                    _.groupBy(value, v => v.measure),
                    (r, v, k) => r.concat(k),
                    []
                )
            }),
            {}
        );
        this.setState({ data, measures });
    }

    render() {
        const { allPlace, data, measures } = this.state;
        if (!data || !measures) {
            return false;
        }
        if (allPlace) {
            return _.map(data, (d, i) => (
                <HeatMap key={i} record={this.state} />
            ));
        }
        return <HeatMap record={this.state} />;
    }
}

export default MainPage;
