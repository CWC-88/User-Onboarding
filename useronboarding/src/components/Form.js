

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";

const NoteForm = props => {
  console.log("error", props.errors, "touched", props.touched);
  console.log(props.status);

  return (
    <Form>
      <Field name="title" placeholder="Title" />
      {props.touched.title && props.errors.title ? (
        <span className="error">{props.errors.title}</span>
      ) : null}
      <Field as="textarea" name="body" placeholder="Body of Note" />
      {props.touched.body && props.errors.body ? (
        <span className="error">{props.errors.body}</span>
      ) : null}
      <Field name="email" placeholder="Email" />
      {props.touched.email && props.errors.email ? (
        <span className="error">{props.errors.email}</span>
      ) : null}
      <label htmlFor="tos">Read the TOS?:</label>
      <Field type="checkbox" name="tos" />
      {props.touched.tos && props.errors.tos ? (
        <span className="error">{props.errors.tos}</span>
      ) : null}
      <button type="submit">Create Note!</button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues: props => {
    return {
      title: props.title || "",
      body: props.body || "",
      email: props.email || "",
      tos: props.tos || false
    };
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Please Enter a Title"),
    body: Yup.string().min(10, "Must be at least 10 characters long"),
    email: Yup.string().email("Please use a valid email"),
    tos: Yup.boolean().oneOf([true], "Must read Terms of Service to Continue")
  }),
  handleSubmit: (values, formikBag) => {
    console.log("values", values);
    console.log("bag", formikBag);
    formikBag.props.addNote({
      ...values,
      id: Date.now()
    });
    formikBag.setStatus("form submitting");
    formikBag.resetForm();
  }
})(NoteForm);
