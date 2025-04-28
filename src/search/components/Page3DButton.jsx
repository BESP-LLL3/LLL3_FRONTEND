import React from 'react';
import styled from 'styled-components';

const Page3DButton = ({ direction, onClick, disabled }) => {
  return (
    <StyledWrapper>
      <button className="button-3d" onClick={onClick} disabled={disabled} aria-label={direction === 'left' ? '이전' : '다음'}>
        <div className="button-top">
          <span className="material-icons" style={{ fontSize: 28 }}>
            {direction === 'left' ? '❮' : '❯'}
          </span>
        </div>
        <div className="button-bottom" />
        <div className="button-base" />
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-block;
  .button-3d {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    border-width: 0;
    padding: 0;
    width: 3.2em;
    height: 3.2em;
    min-width: 2.8em;
    min-height: 2.8em;
    box-sizing: border-box;
    background: transparent;
    font: inherit;
    cursor: pointer;
    margin: 6px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-top {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    color: #fff;
    background-image: linear-gradient(145deg, #6fcf97, #357552);
    text-shadow: 0 -1px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    transition: transform 0.3s, border-radius 0.3s, background 10s;
    padding: 0;
  }
  .button-3d:active .button-top {
    border-radius: 10px 10px 8px 8px / 8px;
    transform: translateY(2px);
    background-image: linear-gradient(145deg, #357552, #6fcf97);
  }
  .button-bottom {
    position: absolute;
    z-index: 1;
    bottom: 4px;
    left: 4px;
    border-radius: 20px;
    padding-top: 6px;
    width: calc(100% - 8px);
    height: calc(100% - 10px);
    background-image: linear-gradient(145deg, #357552, #6fcf97);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
    transition: border-radius 0.2s, padding-top 0.2s;
  }
  .button-base {
    position: absolute;
    z-index: 0;
    top: 4px;
    left: 0;
    border-radius: 20px;
    width: 100%;
    height: calc(100% - 4px);
    background-color: rgba(111, 207, 151, 0.15);
    box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.75),
      inset 0 2px 2px rgba(0, 0, 0, 0.25);
    transition: border-radius 0.2s, padding-top 0.2s;
  }
  .button-3d:active .button-bottom {
    border-radius: 10px 10px 8px 8px / 8px;
    padding-top: 0;
  }
  .button-3d:active .button-base {
    border-radius: 10px 10px 8px 8px / 8px;
  }
  .button-3d:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Page3DButton; 