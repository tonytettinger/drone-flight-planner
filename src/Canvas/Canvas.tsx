import React, { useRef, useEffect, useState } from 'react';
import { StyledCanvas } from './Canvas.styled';
import { Coordinates, savedWayPoints } from '../App';

interface ICanvasProps {
  wayPoints: Coordinates[];
  setWayPoints: React.Dispatch<React.SetStateAction<Coordinates[]>>;
  savedWayPoints: savedWayPoints[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas = ({
  wayPoints,
  setWayPoints,
  savedWayPoints,
  canvasRef,
}: ICanvasProps) => {
  const [canvasDimensions, setCanvasDimensions] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (canvasRef.current != null) {
      changeCanvasDimensions(canvasRef);
    }

    window.addEventListener('resize', () => changeCanvasDimensions(canvasRef));

    return () =>
      window.removeEventListener('resize', () =>
        changeCanvasDimensions(canvasRef)
      );
  }, []);

  React.useLayoutEffect(() => {
    const selectedWayPoint = savedWayPoints.filter(
      (wp) => wp.selected === true
    );
    if (selectedWayPoint.length === 0) return;
    const originalSavedHeight = selectedWayPoint[0].savedMapHeight;
    const heightAdjust = canvasDimensions.y / originalSavedHeight;
    selectedWayPoint[0].coordinates
      .map((point) => {
        const yAdjusted = point.y * heightAdjust;
        return { x: point.x, y: yAdjusted };
      })
      .map((point, i, coordinatesArray) => {
        const ctx = canvasRef.current
          ? canvasRef.current.getContext('2d')
          : null;
        if (!ctx) return;
        drawPoint({ x: point.x, y: point.y }, ctx);

        if (i === coordinatesArray.length - 1) return;
        drawLine(
          point.x,
          point.y,
          coordinatesArray[i + 1].x,
          coordinatesArray[i + 1].y
        );
      });
  });

  function changeCanvasDimensions(ref: React.RefObject<HTMLCanvasElement>) {
    if (ref.current != null) {
      setCanvasDimensions({
        x: ref.current.clientWidth,
        y: ref.current.clientHeight,
      });
    }
  }

  function drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    stroke = 'red',
    width = 3
  ) {
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  function getMapPosition(e: React.MouseEvent) {
    const mapPos = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - mapPos.left;
    const y = e.clientY - mapPos.top;
    return { x, y };
  }

  const handleMapClick = (e: React.MouseEvent) => {
    const clickCoordinates = getMapPosition(e);
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    if (!ctx || !clickCoordinates) return;
    drawPoint(clickCoordinates, ctx);
    setWayPoints((wp) => wp.concat(clickCoordinates));
    if (wayPoints.length) {
      const { x: x1, y: y1 } = wayPoints[wayPoints.length - 1];
      const { x: x2, y: y2 } = clickCoordinates;
      drawLine(x1, y1, x2, y2);
    }
  };

  const drawPoint = (coords: Coordinates, ctx: CanvasRenderingContext2D) => {
    const { x, y } = coords;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.stroke();
  };

  return (
    <StyledCanvas
      width={canvasDimensions.x}
      height={canvasDimensions.y}
      onClick={(e) => handleMapClick(e)}
      ref={canvasRef}
    />
  );
};

export default Canvas;
