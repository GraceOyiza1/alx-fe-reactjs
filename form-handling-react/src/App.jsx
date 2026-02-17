import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>User Registration Lab</h1>

      <section style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px' }}>
        <h2>1. Controlled Components Form</h2>
        <RegistrationForm />
      </section>

      <section style={{ border: '1px solid #646cff', padding: '20px' }}>
        <h2>2. Formik & Yup Form</h2>
        <FormikForm />
      </section>
    </div>
  );
}

export default App;