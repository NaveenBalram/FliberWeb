import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Select from 'react-select';
import styles from './InputDropdown.module.scss';

export const InputDropdown = ({
  backspaceRemoves = false,
  className,
  customComponent = false,
  onBlur,
  onChange,
  placeholder,
  value,
  multi = false,
  isSearchable,
  ...rest
}) => (
  <Select
    backspaceRemoves={backspaceRemoves}
    className={cn(styles.dropdown, className)}
    clearable={false}
    deleteRemoves={false}
    isSearchable
    joinValues={multi}
    multi={multi}
    onBlur={(event) => event.preventDefault()}
    onBlurResetsInput={false}
    onChange={
      multi ? (
        (choices) => onChange(choices)
      ) : (
        (choice) => onChange(choice.value)
      )
    }
    placeholder={placeholder}
    removeSelected={multi}
    style={{ boxShadow: 'none' }}
    styles={{
      singleValue: (base) => ({
        ...base,
        marginLeft: `${customComponent ? '30px' : '0'}`,
      }),
    }}
    value={multi ? value : rest.options.find((c) => c.value === value)}
    {...rest}
  />
);

InputDropdown.propTypes = {
  backspaceRemoves: PropTypes.bool,
  className: PropTypes.shape({}),
  customComponent: PropTypes.bool,
  isSearchable: PropTypes.bool,
  multi: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

InputDropdown.defaultProps = {
  backspaceRemoves: false,
  className: {},
  customComponent: false,
  isSearchable: true,
  multi: false,
  onBlur: () => {},
  placeholder: '',
};
