import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

uuidv4();

const validationSchema = yup.object({
  name: yup.string().required("Enter contact's name"),
  number: yup
    .string()
    .length(10, 'Example: 0930939393')
    .required("Enter contact's phone"),
});

export default class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { name: '', number: '' };

  render() {
    return (
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={({ name, number }, { resetForm, setSubmitting }) => {
          this.props.onSubmit({ name, number, id: uuidv4() });
          setSubmitting(false);
          resetForm();
        }}
      >
        <Form className={styles.contactForm}>
          <label className={styles.nameLabel}>
            Name:
            <Field
              type="text"
              name="name"
              className={styles.contactFormInput}
            />
            <span className={styles.errorMessage}>
              <ErrorMessage name="name" />
            </span>
          </label>

          <label className={styles.numberLabel}>
            Number:
            <Field
              type="tel"
              name="number"
              className={styles.contactFormInput}
            />
            <span className={styles.errorMessage}>
              <ErrorMessage name="number" />
            </span>
          </label>
          <button type="submit" className={styles.submitButton}>
            Add contact
          </button>
        </Form>
      </Formik>
    );
  }
}
