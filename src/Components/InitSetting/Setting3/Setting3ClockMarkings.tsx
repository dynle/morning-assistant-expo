import React from "react";
import { G, Line, Text } from "react-native-svg";

type Props = {
    radius: number;
    center: number;
    minutes: number;
    hours: number;
};

export default function Setting3ClockMarkings(props: Props){
    const { radius, center, minutes, hours } = props;
    const minutesArray = new Array(minutes).fill(1);
    const hoursArray = new Array(hours).fill(1);

    function polarToCartesian(
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number
    ) {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    }

    const minuteSticks = minutesArray.map((minute, index) => {
        const start = polarToCartesian(center, center, radius, index * 5);
        const end = polarToCartesian(center, center, radius, index * 5);
        return (
            <Line
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                key={index}
                x1={start.x}
                x2={end.x}
                y1={start.y}
                y2={end.y}
            />
        );
    });

    const hourSticks = hoursArray.map((hour, index) => {
        const start = polarToCartesian(center, center, radius - 10, index * 30);
        const end = polarToCartesian(center, center, radius, index * 30);
        const time = polarToCartesian(center, center, radius - 15, index * 30);

        return (
            <G key={index}>
                <Line
                    stroke="white"
                    strokeWidth={1}
                    strokeLinecap="round"
                    x1={start.x}
                    x2={end.x}
                    y1={start.y}
                    y2={end.y}
                />
                <Text
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="bold"
                    fill="white"
                    alignmentBaseline="central"
                    x={time.x}
                    y={time.y}
                >
                    {index === 0 ? 12 : index}
                </Text>
            </G>
        );
    });

    return (
        <G>
            {minuteSticks}
            {hourSticks}
        </G>
    );
};
