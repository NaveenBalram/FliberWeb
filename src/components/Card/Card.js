import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import * as styles from './Card.module.scss';

export default class Card extends PureComponent {
  render () {
    const {className, children, ...rest} = this.props;
    return (
      <div className={cn (styles.Card, className)} {...rest}>
        {children}
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.shape ({}).isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};
