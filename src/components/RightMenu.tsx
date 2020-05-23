import * as React from 'react';
import styled from 'styled-components';
import GenericBody from '~/entities/GenericBody';
import { EventBus, EventType } from '~/engine/EventBus';

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
  right: ${(props) => (props.isShown ? '0' : '-100vw')};
  min-width: 40vw;
  min-height: 80vh;
  padding: 0 20px;
  background: transparent;
  border: 2px solid white;
  transition: right 1s;
  display: flex;
  flex-direction: column;
  flex: 1 1 wrap;
  align-content: space-around;
  justify-content: space-around;
  font-family: 'DM Mono';
`;
const CloseMenuButton = styled.i`
  font-size: 2rem;
  margin 5px 0 0 -15px;
  color: white;
  cursor: pointer;
`;
const Title = styled.div`
  width: 100%;
  height: 2.5%;
  margin-bottom: 5%;
  flex: 1 1 auto;
  color: white;
  text-align: center;
  font-size: 2rem;
`;
const ControlArea = styled.div`
  flex: 1 1 auto;
  height: 5%;
  background: transparent;
  color: white;
  text-align: center;
`;

export const RightMenu: React.FC<{}> = () => {
  let subId: symbol;
  const [isShown, setShown] = React.useState(false);
  const [selectedBody, setSelectedBody] = React.useState<GenericBody>();
  const [elevation, setElevation] = React.useState('90');
  const [tilt, setTilt] = React.useState('90');
  const [velocity, setVelocity] = React.useState('1');

  function onChange(
    e: React.ChangeEvent<HTMLInputElement>,
    controlName: string
  ) {
    const { value } = e.target;

    switch (controlName) {
      case 'elevation':
        setElevation(value);
        selectedBody?.setOrbitElevation(parseInt(value));
        break;
      case 'tilt':
        setTilt(value);
        selectedBody?.setOrbitTilt(parseInt(value));
        break;
      case 'velocity':
        setVelocity(value);
        selectedBody?.setVelocity(parseInt(value));
        break;
      case 'drawPath':
        selectedBody?.togglePathDrawing();
    }
  }

  React.useEffect(() => {
    const id = EventBus.subscribe(
      EventType.BodySelected,
      (body: GenericBody) => {
        setSelectedBody(body);
        setElevation(body.getOrbitElevation().toString());
        setTilt(body.getOrbitTilt().toString());
        setVelocity(body.getVelocity().toString());
      }
    );
    subId = id;

    return () => EventBus.unsubscribe(subId);
  });

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
        <CloseMenuButton
          className="material-icons"
          onClick={() => setShown(false)}
        >
          exit_to_app
        </CloseMenuButton>

        <Title>
          SATELLITE
          <br />
          OPTIONS
        </Title>

        <ControlArea>
          Elevation angle: {elevation}
          <br />
          <input
            type="range"
            min="-90"
            max="90"
            step="1"
            value={elevation}
            onChange={(e) => onChange(e, 'elevation')}
          />
        </ControlArea>

        <ControlArea>
          Tilt angle: {tilt}
          <br />
          <input
            type="range"
            min="-90"
            max="90"
            step="1"
            value={tilt}
            onChange={(e) => onChange(e, 'tilt')}
          />
        </ControlArea>

        <ControlArea>
          Velocity: {velocity}
          <br />
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={velocity}
            onChange={(e) => onChange(e, 'velocity')}
          />
        </ControlArea>

        <ControlArea>
          Draw orbit path?
          <br />
          <input type="checkbox" onChange={(e) => onChange(e, 'drawPath')} />
        </ControlArea>
      </MenuContainer>
    </>
  );
};
