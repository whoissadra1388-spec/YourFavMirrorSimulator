"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
};

type ResultItemProps = {
  label: string;
  value: string;
};

type MirrorProps = {
  x: number;
  y: number;
};

type ObjectArrowProps = {
  x: number;
  yBase: number;
  yTop: number;
  color: string;
  label: string;
  dashed?: boolean;
};

type RayLinesProps = {
  toX: (x: number) => number;
  toY: (y: number) => number;
  objectX: number;
  objectHeight: number;
  focalLength: number;
  imageX: number;
  imageHeight: number;
  isVirtual: boolean;
};

type PointLabelProps = {
  x: number;
  y: number;
  text: string;
};

export default function ConcaveMirrorSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSnack, setShowSnack] = useState(false);

  const [objectDistance, setObjectDistance] = useState(18);
  const [objectHeight, setObjectHeight] = useState(4);
  const [focalLength, setFocalLength] = useState(6);
  const [zoom, setZoom] = useState(26);

  const width = 1400;
  const height = 720;

  const originX = width / 2;
  const originY = height / 2;

  const data = useMemo(() => {
    const doValue = objectDistance;
    const f = focalLength;
    const di = 1 / (1 / f - 1 / doValue);
    const m = -di / doValue;
    const imageHeight = m * objectHeight;

    return {
      doValue,
      f,
      di,
      m,
      imageHeight,
      imageType: di > 0 ? "Real Image" : "Virtual Image",
      orientation: imageHeight < 0 ? "Inverted" : "Upright",
    };
  }, [objectDistance, objectHeight, focalLength]);

  const toX = (x: number) => originX + x * zoom;
  const toY = (y: number) => originY - y * zoom;

  const objectX = -objectDistance;
  const imageX = data.di > 0 ? -data.di : Math.abs(data.di);

  function runSimulation() {
    setIsRunning(false);
    setShowSnack(false);
    setIsCalculating(true);

    setTimeout(() => {
      setIsCalculating(false);
      setIsRunning(true);
      setShowSnack(true);
    }, 5000);
  }

  function reset() {
    setIsRunning(false);
    setIsCalculating(false);
    setShowSnack(false);
    setObjectDistance(18);
    setObjectHeight(4);
    setFocalLength(6);
    setZoom(26);
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-900/95 px-8 py-5 backdrop-blur-xl">
        {!isCalculating ? (
          <div className="mx-auto flex max-w-[1500px] items-center gap-8">
            <h1 className="mr-6 text-2xl font-semibold">Concave Mirror</h1>

            <Slider
              label="Object Distance"
              value={objectDistance}
              min={3}
              max={20}
              step={0.5}
              unit="cm"
              onChange={setObjectDistance}
            />

            <Slider
              label="Object Height"
              value={objectHeight}
              min={1}
              max={8}
              step={0.5}
              unit="cm"
              onChange={setObjectHeight}
            />

            <Slider
              label="Focal Length"
              value={focalLength}
              min={3}
              max={12}
              step={0.5}
              unit="cm"
              onChange={setFocalLength}
            />

            <button
              onClick={runSimulation}
              className="ml-auto flex items-center gap-2 rounded-2xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <Play size={18} />
              Run
            </button>

            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 transition hover:bg-white/20"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
        ) : (
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-lg font-semibold text-cyan-100">
                Calculating...
              </p>
              <p className="text-sm text-white/50">
                Ray tracing and mirror equation
              </p>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-cyan-300"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}
      </section>

      <section
        className="relative h-[calc(100vh-104px)] w-full overflow-hidden bg-slate-950"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: `${zoom}px ${zoom}px`,
          backgroundPosition: `${originX % zoom}px ${originY % zoom}px`,
        }}
      >
        <div className="absolute right-6 top-6 z-20 flex flex-col gap-3">
          <button
            onClick={() => setZoom((z) => Math.min(z + 2, 44))}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur transition hover:bg-white/20"
          >
            <ZoomIn size={22} />
          </button>

          <button
            onClick={() => setZoom((z) => Math.max(z - 2, 12))}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur transition hover:bg-white/20"
          >
            <ZoomOut size={22} />
          </button>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-full w-full"
          onWheel={(e) => {
            e.preventDefault();
            setZoom((currentZoom) =>
              e.deltaY < 0
                ? Math.min(currentZoom + 2, 44)
                : Math.max(currentZoom - 2, 12),
            );
          }}
        >
          <line
            x1="-10000"
            y1={originY}
            x2="10000"
            y2={originY}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
          />

          <line
            x1={originX}
            y1="-10000"
            x2={originX}
            y2="10000"
            stroke="rgba(103,232,249,0.25)"
            strokeWidth="2"
          />

          <ConcaveMirror x={originX} y={originY} />

          <PointLabel x={toX(-focalLength)} y={originY + 30} text="F" />
          <PointLabel x={toX(-2 * focalLength)} y={originY + 30} text="C" />

          <ObjectArrow
            x={toX(objectX)}
            yBase={originY}
            yTop={toY(objectHeight)}
            color="#facc15"
            label="Object"
          />

          {isRunning && (
            <>
              <RayLines
                toX={toX}
                toY={toY}
                objectX={objectX}
                objectHeight={objectHeight}
                focalLength={focalLength}
                imageX={imageX}
                imageHeight={data.imageHeight}
                isVirtual={data.di < 0}
              />

              <ObjectArrow
                x={toX(imageX)}
                yBase={originY}
                yTop={toY(data.imageHeight)}
                color={data.di > 0 ? "#38bdf8" : "#c084fc"}
                label="Image"
                dashed={data.di < 0}
              />
            </>
          )}
        </svg>
      </section>

      <AnimatePresence>
        {showSnack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              className="relative w-[520px] rounded-[2rem] border border-cyan-300/20 bg-slate-900/95 p-7 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl"
            >
              <button
                onClick={() => setShowSnack(false)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-red-500/25 text-xl font-bold text-red-200 transition hover:bg-red-500/45"
              >
                ×
              </button>

              <h2 className="mb-5 pr-10 text-2xl font-semibold">
                Calculation Results
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <ResultItem
                  label="Object Distance"
                  value={`${data.doValue.toFixed(2)} cm`}
                />
                <ResultItem
                  label="Focal Length"
                  value={`${data.f.toFixed(2)} cm`}
                />
                <ResultItem
                  label="Image Distance"
                  value={`${data.di.toFixed(2)} cm`}
                />
                <ResultItem label="Magnification" value={data.m.toFixed(2)} />
                <ResultItem
                  label="Image Height"
                  value={`${data.imageHeight.toFixed(2)} cm`}
                />
                <ResultItem label="Image Type" value={data.imageType} />
                <ResultItem label="Orientation" value={data.orientation} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: SliderProps) {
  return (
    <div className="w-64">
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <span className="text-cyan-200">
          {value} {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-cyan-300"
      />
    </div>
  );
}

function ResultItem({ label, value }: ResultItemProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <p className="text-xs text-white/40">{label}</p>
      <p className="mt-1 text-lg font-medium text-cyan-100">{value}</p>
    </div>
  );
}

function ConcaveMirror({ x, y }: MirrorProps) {
  const mirrorWidth = 83;
  const mirrorHeight = 185;
  const points: string[] = [];

  for (let i = -mirrorHeight; i <= mirrorHeight; i += 2) {
    const t = i / mirrorHeight;
    const px = x - mirrorWidth * t * t;
    const py = y + i;

    points.push(`${px},${py}`);
  }

  return (
    <polyline
      points={points.join(" ")}
      fill="none"
      stroke="#67e8f9"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function ObjectArrow({
  x,
  yBase,
  yTop,
  color,
  label,
  dashed = false,
}: ObjectArrowProps) {
  const isUp = yTop < yBase;

  return (
    <g>
      <line
        x1={x}
        y1={yBase}
        x2={x}
        y2={yTop}
        stroke={color}
        strokeWidth="4"
        strokeDasharray={dashed ? "8 8" : "0"}
        strokeLinecap="round"
      />

      <polygon
        points={
          isUp
            ? `${x},${yTop - 12} ${x - 9},${yTop + 5} ${x + 9},${yTop + 5}`
            : `${x},${yTop + 12} ${x - 9},${yTop - 5} ${x + 9},${yTop - 5}`
        }
        fill={color}
      />

      <text x={x} y={yTop - 22} textAnchor="middle" fill={color} fontSize="14">
        {label}
      </text>
    </g>
  );
}

function RayLines({
  toX,
  toY,
  objectX,
  objectHeight,
  focalLength,
  imageX,
  imageHeight,
  isVirtual,
}: RayLinesProps) {
  const mirrorX = 0;

  return (
    <g>
      <line
        x1={toX(objectX)}
        y1={toY(objectHeight)}
        x2={toX(mirrorX)}
        y2={toY(objectHeight)}
        stroke="#f97316"
        strokeWidth="2.5"
      />

      <line
        x1={toX(mirrorX)}
        y1={toY(objectHeight)}
        x2={toX(imageX)}
        y2={toY(imageHeight)}
        stroke="#f97316"
        strokeWidth="2.5"
        strokeDasharray={isVirtual ? "8 8" : "0"}
      />

      <line
        x1={toX(objectX)}
        y1={toY(objectHeight)}
        x2={toX(mirrorX)}
        y2={toY(0)}
        stroke="#22c55e"
        strokeWidth="2.5"
      />

      <line
        x1={toX(mirrorX)}
        y1={toY(0)}
        x2={toX(imageX)}
        y2={toY(imageHeight)}
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeDasharray={isVirtual ? "8 8" : "0"}
      />

      <line
        x1={toX(objectX)}
        y1={toY(objectHeight)}
        x2={toX(-focalLength)}
        y2={toY(0)}
        stroke="#a78bfa"
        strokeWidth="2.5"
      />

      <line
        x1={toX(-focalLength)}
        y1={toY(0)}
        x2={toX(imageX)}
        y2={toY(imageHeight)}
        stroke="#a78bfa"
        strokeWidth="2.5"
        strokeDasharray={isVirtual ? "8 8" : "0"}
      />
    </g>
  );
}

function PointLabel({ x, y, text }: PointLabelProps) {
  return (
    <g>
      <circle cx={x} cy={y - 30} r="4" fill="#67e8f9" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fill="rgba(255,255,255,0.75)"
        fontSize="14"
      >
        {text}
      </text>
    </g>
  );
}