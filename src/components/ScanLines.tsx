"use client";

export function ScanLines() {
  return (
    <>
      {/* Static scan lines */}
      <div className="scan-lines" />

      {/* Moving scan line */}
      <div className="scan-line-moving" />

      {/* Noise overlay */}
      <div className="noise" />
    </>
  );
}
