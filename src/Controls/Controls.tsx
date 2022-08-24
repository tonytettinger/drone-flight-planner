import React from 'react';
import { savedWayPoints } from '../App';
import { StyledSelect } from './Select/Select.styled';
import {
  ButtonWrapper,
  StyledButton,
  StyledControls,
  StyledHeader,
  StyledInput,
  StyledLabel,
} from './Controls.styled';
import Select from './Select/Select';

interface IControlProps {
  routeName: string;
  setRouteName: React.Dispatch<React.SetStateAction<string>>;
  savedWayPoints: savedWayPoints[];
  onSaveChange: () => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClear: () => void;
}

export const Controls = ({
  routeName,
  setRouteName,
  savedWayPoints,
  onSaveChange,
  onSelectChange,
  onClear
}: IControlProps) => {
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setRouteName(e.currentTarget.value);
  };
  return (
    <StyledControls>
      <StyledHeader>Drone Flight planner</StyledHeader>
      <StyledInput
        maxLength={35}
        placeholder="Enter current route name"
        value={routeName}
        onChange={onChangeHandler}
      />
      <ButtonWrapper>
      <StyledButton onClick={onSaveChange} type="button">
        Save route
      </StyledButton>
      <StyledButton onClick={onClear} type="button">
        Clear Map
      </StyledButton>
      </ButtonWrapper>
     
      <StyledLabel htmlFor="selectWayPoint">Select saved routes</StyledLabel>
      <Select id="selectWayPoint" savedWayPoints={savedWayPoints} onSelectChange={onSelectChange}/>
    </StyledControls>
  );
};
