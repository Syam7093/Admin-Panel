import * as Yup from 'yup';
export const  validationSchema=()=>Yup.object({
    title: Yup.string().required('Title is required'),
    name: Yup.string().required('Name is required'),
    gender: Yup.string().required('Gender is required'),
    status: Yup.string().required('Status is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed()
    .nullable()
    .test('fileSize', 'File size exceeds 2MB', value => {
      return !value || value.size <= 2 * 1024 * 1024; // 2MB
    })
    .test('fileType', 'Invalid file type. Only JPG, PNG, and GIF are allowed.', value => {
      return !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    }),
  })

  