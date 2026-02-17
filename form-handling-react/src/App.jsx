import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

function App() {
  return (
    <div className="App">
      <h1>User Registration</h1>
      <section>
        <h2>Controlled Component Form</h2>
        <RegistrationForm />
      </section>
      <hr />
      <section>
        <h2>Formik Form</h2>
        <FormikForm />
      </section>
    </div>
  );
}

export default App;