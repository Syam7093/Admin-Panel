import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../../utils';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/user/userService';

const AddUser = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
  const formik = useFormik({
    initialValues: {
      title: '',
      name: '',
      gender: '',
      status: '',
      description: ''
    },
    validationSchema:validationSchema(),
    // onSubmit: (values) => handleSubmit(values)
    onSubmit: (values, { resetForm }) => handleSubmit(values, resetForm)
  });

  const handleSubmit=async(values,resetForm)=>{
    const datas={
        ...values
    }
    dispatch(addUser(datas))
    
    resetForm();  
  }

  return (
    <div>
        <button onClick={()=>{navigate("/")}}>Goback</button>
        <form className="form-container" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="error">{formik.errors.title}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div className="error">{formik.errors.gender}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {formik.touched.status && formik.errors.status ? (
          <div className="error">{formik.errors.status}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="error">{formik.errors.description}</div>
        ) : null}
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default AddUser;
