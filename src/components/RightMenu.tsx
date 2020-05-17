import * as React from 'react';
import styled from 'styled-components';

const ShowMenuButton = styled.i<{ isShown: boolean }>`
  position: fixed;
  top: 5vh;
  right: 1vw;
  font-size: 2rem;
  color: ${(props) => (props.isShown ? 'transparent' : 'white')};
  cursor: pointer;
  transition: color 0.5s;
  transition-delay: ${(props) => (props.isShown ? '0' : '0.5s')};
`;

const MenuContainer = styled.div<{ isShown: boolean }>`
  position: fixed;
  z-index: 100;
  top: 5vh;
  right: ${(props) => (props.isShown ? '0' : '-25vw')};
  width: 20vw;
  height: 80vh;
  background: transparent;
  border: 2px solid white;
  transition: right 1s;
  display: flex;
  flex-direction: column;
  flex: 1 1 wrap;
  align-content: space-around;
  justify-content: space-around;
`;
const CloseMenuButton = styled.i`
  font-size: 2rem;
  color: white;
  cursor: pointer;
`;
const ControlArea = styled.div`
  flex: 1 1 auto;
  height: 10%;
  background: transparent;
  color: white;
  text-align: center;
`;
const CloseButtonWrapper = styled(ControlArea)`
  text-align: left;
`;

export const RightMenu: React.FC<{}> = () => {
  const [isShown, setShown] = React.useState(false);
  const [satNumber, setSatNumber] = React.useState('0');
  const [velocity, setVelocity] = React.useState('0');

  function onChange(
    e: React.ChangeEvent<HTMLInputElement>,
    controlName: string
  ) {
    const { value } = e.target;

    switch (controlName) {
      case 'sat':
        setSatNumber(value);
        break;
      case 'velocity':
        setVelocity(value);
        break;
    }
  }

  return (
    <>
      <ShowMenuButton
        isShown={isShown}
        className="material-icons"
        onClick={() => setShown(true)}
      >
        gamepad
      </ShowMenuButton>

      <MenuContainer isShown={isShown}>
        <CloseButtonWrapper>
          <CloseMenuButton
            className="material-icons"
            onClick={() => setShown(false)}
          >
            exit_to_app
          </CloseMenuButton>
        </CloseButtonWrapper>

        <ControlArea>
          No. of sattelites: {satNumber}
          <br />
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={satNumber}
            onChange={(e) => onChange(e, 'sat')}
          />
        </ControlArea>

        <ControlArea>
          Velocity coefficent: {velocity}
          <br />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={velocity}
            onChange={(e) => onChange(e, 'velocity')}
          />
        </ControlArea>

        <ControlArea></ControlArea>
      </MenuContainer>
    </>
  );
};
