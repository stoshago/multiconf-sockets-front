import * as yup from "yup";

export const schemaLogin = yup
    .object({
        username: yup.string().min(5, "Username should contain at least 5 symbols").required("Username is required"),
        password: yup.string().min(5, "Password should contain at least 5 symbols").required("Password is required field"),
    })
    .required();

export const schemaSignUp = yup
    .object({
        displayName: yup
            .string()
            .matches(/^([^0-9]*)$/, "Display name should not contain numbers")
            .required("Display Name is required field"),
        password: yup.string().min(5).required("Password is required field"),
        passwordConfirm: yup
            .string()
            .required("Password is required field")
            .oneOf([yup.ref("password")], "Passwords must match")
    })
    .required();
