import * as Yup from 'yup';
export const  validationSchema=()=>Yup.object({
    title: Yup.string().required('Title is required'),
    name: Yup.string().required('Name is required'),
    gender: Yup.string().required('Gender is required'),
    status: Yup.string().required('Status is required'),
    description: Yup.string().required('Description is required'),
  })

  