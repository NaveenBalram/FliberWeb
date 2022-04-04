import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import Dropdown, {
  DropdownContent,
  DropdownTrigger,
} from 'react-simple-dropdown';
import 'react-simple-dropdown/styles/Dropdown.css';
import styles from './DropdownMenu.module.scss';

export default class DropdownMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.dropdown = React.createRef();
  }

  handleClick = () => {
    this.dropdown.current.hide();
  };

  handleShow = () => {
    this.dropdown.current.show();
  };

  render() {
    const {content, title, className} = this.props;

    return (
      <Dropdown ref={this.dropdown}>
        <div
          className={className}
          onClick={this.handleShow}
          onKeyPress={this.handleShow}
          tabIndex="0"
        >
          {title}
          <div
            alt="User Profile"
            className={styles.arrow}
            title="User Profile"
          />
        </div>
        <DropdownContent
          onClick={this.handleClick}
          onkeyPress={this.handleClick}
        >
          {content}
        </DropdownContent>
      </Dropdown>
    );
  }
}

DropdownMenu.propTypes = {
  className: PropTypes.string,
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
};

DropdownMenu.defaultProps = {
  className: '',
  title: '',
};
