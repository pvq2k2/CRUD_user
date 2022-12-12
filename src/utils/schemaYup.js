import * as yup from "yup";

export const schemaUser = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup
      .string()
      .required()
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        "Vui lòng nhập đúng định dạng số điện thoại"
      ),

    email: yup
      .string()
      .email()
      .required()
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Vui lòng nhập đúng định dạng email"
      ),
    school: yup.string().required(),
    address: yup.string().required(),
    gender: yup.string().required(),
    favourites: yup.array().required(),
    dateOfBirth: yup.date().required(),
    isGraduate: yup.boolean().required(),
  })
  .required();
