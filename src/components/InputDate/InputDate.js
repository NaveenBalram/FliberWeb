import React from 'react';
import PropTypes from 'prop-types';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { InputMasked } from '../InputMasked/InputMasked';

export const InputDate = ({ dateFormat, ...rest }) => {
  return (
    <InputMasked
      keepCharPositions
      mask={dateFormat.split('').map(v => (v === '/' ? '/' : /\d/))}
      pipe={createAutoCorrectedDatePipe(dateFormat)}
      {...rest}
    />
  );
};

InputDate.propTypes = {
  dateFormat: PropTypes.string,
};

InputDate.defaultProps = {
  dateFormat: 'mm/dd/yyyy',
};
