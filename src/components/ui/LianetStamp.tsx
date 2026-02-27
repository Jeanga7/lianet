"use client";

import { cn } from "@/lib/utils";

interface LianetStampProps {
    /** Text for the top arc (default: "LIANET") */
    topText?: string;
    /** Text for the bottom arc (default: "CONNECTING THE FUTURE") */
    bottomText?: string;
    /** CSS class for the outer container */
    className?: string;
    /** Primary color for rings and text (default: #1B365D) */
    color?: string;
    /** Accent color for the divider dots (default: #40B4A6) */
    accentColor?: string;
    /** Background color for the center circle (default: #F4F6F9) */
    centerBg?: string;
    /** Overall opacity multiplier 0-1 (default: 1) */
    opacity?: number;
    /** Unique ID prefix for SVG defs (avoids conflicts when using multiple stamps) */
    id?: string;
}

export default function LianetStamp({
    topText = "L I A N E T",
    bottomText = "CONNECTING THE FUTURE",
    className,
    color = "#1B365D",
    accentColor = "#40B4A6",
    centerBg = "#F4F6F9",
    opacity = 1,
    id = "stamp",
}: LianetStampProps) {
    const topId = `${id}-text-top`;
    const bottomId = `${id}-text-bottom`;

    return (
        <div className={cn("relative aspect-square", className)} style={{ opacity }}>
            {/* SVG Stamp Structure */}
            <svg
                viewBox="0 0 340 340"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer double ring */}
                <circle cx="170" cy="170" r="164" fill="none" stroke={color} strokeWidth="2.5" opacity="0.25" />
                <circle cx="170" cy="170" r="155" fill="none" stroke={color} strokeWidth="1.5" opacity="0.18" />

                {/* Inner ring */}
                <circle cx="170" cy="170" r="110" fill="none" stroke={color} strokeWidth="1.5" opacity="0.15" />

                {/* Decorative dots at cardinal points */}
                {[0, 90, 180, 270].map((angle) => {
                    const rad = (angle * Math.PI) / 180;
                    const cx = 170 + 135 * Math.cos(rad);
                    const cy = 170 + 135 * Math.sin(rad);
                    return <circle key={angle} cx={cx} cy={cy} r="3.5" fill={color} opacity="0.2" />;
                })}

                {/* Curved text paths */}
                <defs>
                    <path id={topId} d="M 40,170 A 130,130 0 0,1 300,170" fill="none" />
                    <path id={bottomId} d="M 300,170 A 130,130 0 0,1 40,170" fill="none" />
                </defs>

                {/* Top arc text */}
                <text fill={color} opacity="0.35">
                    <textPath
                        href={`#${topId}`}
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            fontSize: "16px",
                            fontFamily: "Nunito, sans-serif",
                            fontWeight: 900,
                            letterSpacing: "0.35em",
                        }}
                    >
                        {topText}
                    </textPath>
                </text>

                {/* Bottom arc text */}
                <text fill={color} opacity="0.35">
                    <textPath
                        href={`#${bottomId}`}
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            fontSize: "12px",
                            fontFamily: "Nunito, sans-serif",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                        }}
                    >
                        {bottomText}
                    </textPath>
                </text>

                {/* Divider dots between top and bottom text */}
                <circle cx="42" cy="170" r="2.5" fill={accentColor} opacity="0.5" />
                <circle cx="298" cy="170" r="2.5" fill={accentColor} opacity="0.5" />
            </svg>

            {/* Centered Pictogram */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="w-[42%] h-[42%] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: centerBg }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/pictogram-lianet.png"
                        alt="Lianet"
                        loading="eager"
                        className="w-[65%] h-[65%] object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
