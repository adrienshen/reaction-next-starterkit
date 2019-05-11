import * as yup from "yup";
/**
 * Formik validation schemas using Yup
 * - Personal information forms
 * - Shipping and billing address forms
 * 
 */

export const PersonalInformationSchema = yup.object().shape({
  name: yup.string().required().min(5),
  email: yup.string().required().min(5),
});

export const AddressSchema = yup.object().shape({
  address1: yup.string().required().min(5),
  city: yup.string().required().min(3),
  country: yup.string().required().min(3),
  postal: yup.string().required().min(5),
  phone: yup.string().required().min(5),
});

export const DesignerContactFormSchema = yup.object().shape({
  name: yup.string().required().min(5),
  email: yup.string().email().required().min(5),
  room: yup.string().required(),
  budget: yup.string().required(),
  contents: yup.string().required().min(10)
});
