import {Form, Field, FormikErrors, Formik } from "formik";

import {
    FormControl,
    IconButton,
    InputAdornment,
    Button,
    CircularProgress,
} from "@mui/material";

import {TextField} from 'formik-mui'
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {useMutation,gql, ApolloError } from "@apollo/client";
interface UserLoginInput{
    email: string;
    password: string;
}

function isValidEmail(email: string) {
     return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}


const LOGIN_MUTATION = gql`
    mutation LoginMutate($data: UserLoginInput!) {
        Login(data: $data) {
            status
            message
            token
        }
    }
`;



interface LogInReturnData{
    status?:string,
    message?:string,
    token?:string
}

interface FormProps {
    initialEmail?: string;
}


export default function Login() {
    return (
        <>
            <div className="main container">
                <div className="form login min-h-100">
                    <LoginForm />
                </div>
            </div>
        </>
    );
}


const LoginForm = (props:FormProps) =>{

    const [LoginMutate, { data, loading, error }] = useMutation(LOGIN_MUTATION);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault;
    };

    return(
        <Formik
            initialValues={{
                email: props.initialEmail || '',
                password:''

            }}
            
            validate={
                (values: UserLoginInput) => {
                    let errors: FormikErrors<UserLoginInput> = {};
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (!isValidEmail(values.email)) {
                        errors.email = "Invalid email address";
                    }

                    if(!values.password){
                        errors.password = "Required";
                    }


                    return errors;
            }}

            onSubmit = {async (
                values:UserLoginInput,
                {setSubmitting}
            ) => {
                const result= await LoginMutate({variables:{data: {email:values.email,password:values.password}}}).catch((e:ApolloError)=>{
                    console.log(e)
                });
                console.log(result);
            }}
        >
            {({touched, errors, isSubmitting}) => (<Form id="login-form" className="login">
                <div className="field email">
                    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                        <Field
                            component={TextField}
                            tabIndex={0}
                            error={touched.email && !!errors.email}
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Enter your email here"
                            aria-label="Enter your email here"
                            helperText={(touched.email && errors.email)? errors.email:null}
                        />
                    </FormControl>
                </div>

                <div className="field password">
                    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                        <Field
                            component={TextField}
                            tabIndex={1}
                            name="password"
                            aria-label="Enter your passsword here"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            label="Password"
                            helperText={(touched.password && errors.password)? errors.password:null}
                            error={touched.password && !!errors.password}
                            placeholder="Enter your password here"
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: "25ch" }}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress color="inherit"/> : 'Login'}
                        </Button>
                    </FormControl>
                </div>
            </Form>)}
        </Formik>
    );
}