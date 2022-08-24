import styled from 'styled-components';

export const StyledControls = styled.div`
  width: 100%;
  height: 100%;
  grid-area: controls;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const StyledHeader = styled.h1`
  font-weight: bold;
  font-size: 2rem;
`;

export const StyledInput = styled.input`
border: 1px solid #0000FF;
appearance: none;
margin: 2rem 0;
background: #f2f2f2;
padding: 1.5rem;
border-radius: 0.5rem;
width: 50%;
font-size: 14px;
`;

export const StyledButton = styled.button`
  border-radius: 1.2rem;
  border: 0;
  padding: 1.5rem 3rem;
  text-decoration: none;
  cursor: pointer;
  width: 48%;
  font-size: 1.5rem;
  font-weight: bold;
  &:hover {
    background: #ADD8E6;
  }
  min-width: 13rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 50%;
`;

export const StyledLabel = styled.label`
  margin-top: 2rem;
`;
