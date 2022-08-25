import Canvas from './Canvas/Canvas';
import { StyledApp } from './App.styled';
import { Controls } from './Controls/Controls';
import { useRef, useState } from 'react';
import { presetRoutes } from './_config/presetRoutes';

export interface savedWayPoints {
  name: string;
  selected: boolean;
  coordinates: Coordinates[];
}

export type Coordinates = { x: number; y: number };

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wayPoints, setWayPoints] = useState<Coordinates[]>([])
  const [routeName, setRouteName] = useState<string>('')
  const [savedWayPoints, setSavedWayPoints] = useState<savedWayPoints[]>(presetRoutes)

  const onSaveChange = () => {
    if(savedWayPoints.some(wp => wp.name === routeName) || routeName === '') return
    const newWayPoint = {
      name: routeName,
      selected: false,
      coordinates: wayPoints
    }
    setWayPoints([])
    const newWayPoints = [...savedWayPoints, newWayPoint]
    setSavedWayPoints(newWayPoints)
    setRouteName('')
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const route = e.currentTarget.value
    const newWayPointsSelected = savedWayPoints.map(wp => {
      if(wp.name === route){
        wp.selected = true
      } else {
        wp.selected = false
      }
      return wp
  })
  setSavedWayPoints(newWayPointsSelected)
  if(canvasRef.current)clearCanvas(canvasRef.current)

  }

  const clearCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    if(context)context.clearRect(0, 0, canvas.width, canvas.height);
  }

  const onClear = () => {
    if(canvasRef.current)clearCanvas(canvasRef.current)
    setWayPoints([])
    const newWayPointsSelected = savedWayPoints.map(wp => {
      wp.selected = false
      return wp
  })
  setSavedWayPoints(newWayPointsSelected)
  }

  return (
    <StyledApp>
      <Canvas canvasRef={canvasRef} savedWayPoints={savedWayPoints} wayPoints={wayPoints} setWayPoints={setWayPoints} />
      <Controls
        routeName={routeName}
        setRouteName={setRouteName}
        savedWayPoints={savedWayPoints}
        onSaveChange={onSaveChange}
        onSelectChange={onSelectChange}
        onClear={onClear}
      />
    </StyledApp>
  );
};

export default App;
