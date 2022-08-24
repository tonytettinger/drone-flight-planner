import React, { useState, useEffect } from 'react';
import { savedWayPoints } from '../../App';
import { StyledSelect } from './Select.styled'

interface ISavedWayPointProps {
  savedWayPoints: savedWayPoints[],
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string
}


const Select = ({savedWayPoints, onSelectChange}: ISavedWayPointProps) => {
  return (
    <StyledSelect onChange={(e)=>onSelectChange(e)}>
      {savedWayPoints.map(({name})=> {
        return <option value={name} key={name}>{name}</option>
      })}
    </StyledSelect>
  )
}

export default Select