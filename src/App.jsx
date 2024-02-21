import "./App.css";
import { Formik, Form, Field } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { ErrorMessage } from "formik";

//валідація елементів форми
const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  message: Yup.string()
    .min(3, "too short")
    .max(256, "Too long")
    .required("Required"),
  level: Yup.string().oneOf(["good", "neutral", "bad"]).required("Required"),
});

//валідація

const initialValues = {
  username: "",
  email: "",
  message: "",
  level: "good",
};

const FeedbackForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const msgFieldId = useId();
  const levelFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form>
        <div>
          <label htmlFor={nameFieldId}>Username</label>
          <Field type="text" name="username" id={nameFieldId} />
          <ErrorMessage name="username" as="span" />
        </div>

        <div>
          <label htmlFor={emailFieldId}>Email</label>
          <Field type="email" name="email" id={emailFieldId} />
          <ErrorMessage name="email" as="span" />
        </div>

        <hr />
        <div>
          <label htmlFor={msgFieldId}>Message</label>
          <Field as="textarea" name="message" id={msgFieldId} rows="5" />
          <ErrorMessage name="message" as="span" />
        </div>

        <div>
          <label htmlFor={levelFieldId}>Service satisfaction level</label>
          <Field as="select" name="level" id={levelFieldId}>
            <option value="good">Good</option>
            <option value="neutral">Neutral</option>
            <option value="bad">Bad</option>
          </Field>
          <ErrorMessage name="level" as="span" />
        </div>
        <hr />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FeedbackForm;
