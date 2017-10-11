import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

class TypeSelector extends Component {
  render() {
    const { types, onChangeType } = this.props;
    return (
      <select onChange={onChangeType}>
        {types.map(type =>
          <option key={type.value} value={type.value}>
            {type.label}
          </option>,
        )}
      </select>
    );
  }
}

export default TypeSelector;
