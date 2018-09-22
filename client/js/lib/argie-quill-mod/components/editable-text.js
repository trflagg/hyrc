import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class EditableText extends React.Component {
  state = {
    editing: false,
    value: this.props.default,
  }

  componentDidUpdate(prevProps, prevState) {
    // went from editing to not editing
    if (prevState.editing && !this.state.editing) {
      this.props.onEditComplete(this.state.value);
    }
  }

  handleClick = () => {
    if (!this.state.editing) {
      this.setState({
        editing: true,
      });
    }
  }

  handleBlur = () => {
    this.setState({
      editing: false,
    });
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const {
      editing,
      value,
    } = this.state;

    const INPUT_CHAR_WIDTH = 22;
    const inputWidth = value.length * INPUT_CHAR_WIDTH;

    this.props.node.setAttribute('draggable', !editing);

    return (
      <span>
        {!editing &&
          <span onClick={this.handleClick}>
            <FontAwesomeIcon
              icon={faEdit}
              size='xs'
            />
            {value}
          </span>
        }
        { editing &&
          <input
            type='text'
            value={value}
            onChange={this.handleInputChange}
            onBlur={this.handleBlur}
            style={{
              width: inputWidth
            }}
          />
        }
      </span>
    );
  }
}

export default EditableText;
