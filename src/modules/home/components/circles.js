import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Circle = styled.div`
  width: ${p => `${p.type}px`};
  height: ${p => `${p.type}px`};
  border-radius: 50px;
  background-color: yellow;
  position: absolute;
  top: ${p => `-${p.type / 2 - 4}px`};
  left: ${p => `${p.left}px`};
`;

const Label = styled.div`
  position: absolute;
  top: -15px;
`;

class Circles extends PureComponent {
  static propTypes = {
    circles: PropTypes.array,
    conversionNumber: PropTypes.number,
  };
  render() {
    const { circles, conversionNumber } = this.props;
    return circles.map((circle, idx) =>
      <Circle key={idx} left={circle.x} type={circle.type}>
        <Label>{circle.x * conversionNumber}</Label>
      </Circle>,
    );
  }
}

export default Circles;
