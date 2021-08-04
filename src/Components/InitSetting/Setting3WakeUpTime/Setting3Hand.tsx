import React from "react";
import { Line } from "react-native-svg";

type Props = {
    center: number;
    radius: number;
    angle: number;
    strokeWidth: string;
    stroke: string;
    length:number;
};

export default function Setting3Hand(props: Props) {
    const { center, radius, angle, stroke, strokeWidth, length } = props;
    const { x, y } = polarToCartesian(center, center, radius - length, angle);

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

    return (
        <Line
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke={stroke}
        />
    );
}
