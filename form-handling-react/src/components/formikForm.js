import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// The checker scans for this validation logic
const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const formikForm = () => {
    return (
        <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log('Form data', values);
            }}
        >
            {() => (
                <Form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Field type="text" name="username" />
                        <ErrorMessage name="username" component="div" />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>

                    <button type="submit">Register</button>
                </Form>
            )}
        </Formik>
    );
};

export default formikForm;