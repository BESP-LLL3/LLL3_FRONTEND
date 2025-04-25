import React from 'react';
import styled from 'styled-components';

const Card = ({ children }) => {
  return (
    <StyledCard>
      <div className="tools">
        <div className="circle">
          <span className="red box"></span>
        </div>
        <div className="circle">
          <span className="yellow box"></span>
        </div>
        <div className="circle">
          <span className="green box"></span>
        </div>
      </div>
      <div className="content">
        {children}
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  height: 88%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e0e0e0;

  .tools {
    display: flex;
    padding: 12px;
    gap: 8px;
    border-bottom: 1px solid #f0f0f0;
  }

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 0;
    border-radius: 50%;
  }

  .red {
    background: #ff5f56;
  }

  .yellow {
    background: #ffbd2e;
  }

  .green {
    background: #27c93f;
  }

  .content {
    flex: 1;
    padding: 0;
    overflow: hidden;
  }
`;

export default Card;
