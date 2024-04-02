import { Field, Formik, Form, ErrorMessage } from "formik";
import { useLogin } from "./hook/useLogin";
import axios from 'axios';

const fetchData = async () => {
  console.log("lakku1");
  try {
    let response = await axios.post('http://localhost:8080/api/v1/private/login', {
      "password": "password",
      "username": "admin@shopizer.com"
    }
    )
    console.log("lakku2");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const Login = ({setCurrInfo}) => {
  const{initialValues,handleLogin,loginSchema}=useLogin()
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div className="bg-slate-600 flex flex-col justify-center items-center p-8 mr-auto ml-auto w-80 mt-32 rounded-3xl">
            <div className="flex flex-col justify-center items-start gap-6 font-Pacifico text-white">
              <h1 className="text-4xl">Login</h1>
              <label className="text-lg">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="h-12 rounded-2xl text-black"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600"
              />
              <label className="text-lg">Password</label>
              <Field
                type="text"
                name="password"
                id="password"
                className="h-12 rounded-2xl text-black"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
              <button
                type="submit"
                className="bg-red-400 w-auto p-4 rounded-xl text-white font-bold"
               onClick={fetchData}
              >
                
                Login1
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
