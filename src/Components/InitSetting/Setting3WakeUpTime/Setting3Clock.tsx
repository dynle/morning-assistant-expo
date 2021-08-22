import React from "react";
import Svg from "react-native-svg";
import Setting3ClockMarkings from "./Setting3ClockMarkings";
import Setting3Hand from "./Setting3Hand";

export default function Clock(props: { width: number; height: number, hour:number, minutes:number }) {
    const diameter = props.width-5;
    const center = props.width / 2;
    const radius = diameter / 2;
    const hourStickCount = 12;
    const minuteStickCount = 12 * 6;

    const _minutes = props.minutes/60*360;
    const _hours = props.hour/12*360+props.minutes/2;

    return (
        <Svg height={props.width} width={props.width}>
            {/* <Setting3ClockMarkings
                minutes={minuteStickCount}
                hours={hourStickCount}
                radius={radius}
                center={center}
            /> */}
            <Setting3Hand
                angle={_hours}
                center={center}
                radius={radius}
                stroke="black"
                strokeWidth="7"
                length={40}
            />
            <Setting3Hand
                angle={_minutes}
                center={center}
                radius={radius}
                stroke="black"
                strokeWidth="5"
                length={10}
            />
        </Svg>
    );
}
