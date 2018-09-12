import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const CharacterEditor = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field
          component="input"
          name="firstName"
          type="text"
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field
          component="input"
          name="lastName"
          type="text"
        />
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <Field
          component="select"
          name="gender"
          type="text"
        >
          <option value="FEMALE">Female</option>
          <option value="MALE">Male</option>
        </Field>
      </div>

      <div>
        <button type="submit" disabled={pristine || submitting}>
          Save
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Reset
        </button>
      </div>
    </form>
  )
}

const CharacterEditorForm = reduxForm({
  form: 'character',
  enableReinitialize: true,
})(CharacterEditor);

export default CharacterEditorForm;
