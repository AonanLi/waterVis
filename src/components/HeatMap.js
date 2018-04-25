import React from "react";
import _ from "lodash";
import moment from "moment";

const daysInYear = year => {
    if (year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0)) {
        return 366;
    }
    return 365;
};

const HeatMap = ({ record }) => {
    const { data, measures, place, dateUnit, date } = record;
    const yAxis =
        dateUnit === "year"
            ? daysInYear(date)
            : moment(data, "YYYY-MM").daysInMonth();
    return (
        <div>
            {place}

            {measures[place].map((m, i) => (
                <div key={i}>
                    {m} {_.map(yAxis, (d, j) => <span key={j}>1</span>)}
                </div>
            ))}
        </div>
    );
};

export default HeatMap;
