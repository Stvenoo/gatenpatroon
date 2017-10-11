import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import TypeSelector from './type-selector';
import Circles, { Circle } from './circles';

const Main = styled.div`margin: 10px;`;

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid #000;
  height: 100px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const lineStyles = css`
  width: 100%;
  height: 8px;
  background-color: blue;
  position: relative;
  cursor: pointer;
`;

const LineTop = styled.div`
  ${lineStyles};
  margin-top: 20px;
  margin-bottom: auto;
`;

const LineBottom = styled.div`
  ${lineStyles};
  margin-bottom: 20px;
  margin-top: auto;
`;

const Indicator = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

class Home extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  };

  state = {
    width: 3000,
    elementWidth: 0,
    conversionNumber: 0,
    circleValue: 0,
    circles: [],
    types: [{ label: 'big', value: 20 }, { label: 'medium', value: 10 }, { label: 'small', value: 5 }],
    selectedType: 20,
    current: null,
  };

  componentDidMount() {
    const conversionNumber = Number((this.state.width / this.el.offsetWidth).toFixed(2));
    this.setState({ conversionNumber, elementWidth: this.el.offsetWidth });
  }

  onChangeType = e => this.setState({ selectedType: e.target.value });

  onEnterLine = (e) => {
    this.onHoverLine(e);
  };

  onLeaveLine = () => {
    this.setState({ current: null });
  };

  onHoverLine = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - rect.left;
    this.setState({ current: x });
  };

  addCircle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - rect.left;
    this.setState({ circles: [...this.state.circles, { x, type: this.state.selectedType }], current: null });
  };

  onCircleValueChanged = (e) => {
    const { value } = e.target;
    if (value >= 0 && value <= 3000) {
      this.setState({ circleValue: value });
    }
  };

  onEnter = (e) => {
    if (e.key === 'Enter') {
      const { conversionNumber, circleValue } = this.state;
      if (circleValue >= 0 && circleValue <= 3000) {
        this.setState({
          circles: [...this.state.circles, { x: circleValue / conversionNumber, type: this.state.selectedType }],
          circleValue: 0,
          current: null,
        });
      }
    }
  };

  render() {
    const { width, circles, current, types, selectedType, conversionNumber, circleValue } = this.state;
    return (
      <Main>
        <TypeSelector types={types} selectedType={selectedType} onChangeType={this.onChangeType} />
        <div>
          Add circle
          <input type='number' value={circleValue} onChange={this.onCircleValueChanged} onKeyPress={this.onEnter} />
        </div>
        <Wrapper innerRef={el => (this.el = el)}>
          <LineTop
            onMouseMove={this.onHoverLine}
            onMouseEnter={this.onEnterLine}
            onMouseLeave={this.onLeaveLine}
            onClick={this.addCircle}
          >
            <Circles circles={circles} conversionNumber={conversionNumber} />
            {current && <Circle left={current} type={selectedType} />}
          </LineTop>
          <LineBottom>
            <Circles circles={circles} conversionNumber={conversionNumber} />
            {current && <Circle left={current} type={selectedType} />}
          </LineBottom>
        </Wrapper>
        <Indicator>
          <div>0</div>
          <div>{width}mm</div>
        </Indicator>
      </Main>
    );
  }
}

export default Home;
