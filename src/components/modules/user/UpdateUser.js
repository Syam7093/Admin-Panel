import React, { useEffect,useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { validationSchema } from '../../utils';
import { useDispatch,useSelector } from 'react-redux';
import { addUser, updateUser, updateusermain } from '../../redux/user/userService';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const uniqueId1 = uuidv4();
const UpdateUser = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [maleFiles, setMaleFiles] = useState(null); // For storing the selected image
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const [loading, setLoading] = useState(false);
    const {id}=useParams()
    console.log(id,"id----")

    const singleuser=useSelector((state)=>state.userSlice.singleUser)
    console.log(singleuser,"singleuser----")

    useEffect(()=>{
      if(id)
      {
        dispatch(updateUser(id))
      }
    },[id,dispatch])
   
    
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        title: singleuser?.title ,
        name: singleuser?.name ,
        gender: singleuser?.gender ,
        status: singleuser?.status ,
        description: singleuser?.description ,
        image:""
        
    },
    validationSchema:validationSchema(),
    // onSubmit: (values) => handleSubmit(values)
    onSubmit: (values, { resetForm }) => handleSubmit(values, resetForm)
  });
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setMaleFiles(file); // Store the selected file
  //   if (file) {
      
  //     setImagePreview(URL.createObjectURL(file)); // Set the image preview URL
  //   }
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMaleFiles(file); // Store the selected file
      setImagePreview(URL.createObjectURL(file)); // Set the image preview URL
    } else {
      setMaleFiles(null); // Clear the file if no file is selected
      setImagePreview(null); // Clear the image preview if no file is selected
    }
  };
  

  // const handleSubmit=async(values,resetForm)=>{
  //   const datas={
  //       ...values,
  //       id: singleuser.id,
  //   }
  //  await dispatch(updateusermain(datas))
    
  //   // resetForm();  
  // }
  const handleSubmit = async (values, resetForm) => {
    const genderMapping = {
      Male: 1,
      Female: 2,
    };
    
    const mapGenderToNumber = (gender) => genderMapping[gender] || '';
    // Start loading indicator
   if(!maleFiles)
     {
       formik.setFieldError("image","imasg sss")
       return 
     }
     setLoading(true);
   const uploadImage = async (file, path) => {
     if (file) {
       const imageRef = ref(storage, path);
       const uploadTask = uploadBytesResumable(imageRef, file);
       const snapshot = await uploadTask;
       return await getDownloadURL(snapshot.ref); // Get the download URL of the uploaded image
     }
     return '';
   };

   // Upload image if selected
   let maleImageUrl = singleuser.maleImageUrl;
   if (maleFiles) {
     maleImageUrl = await uploadImage(maleFiles, `Category/${uniqueId1}_male_${maleFiles.name}`);
   }

   // Create data object to dispatch
   const datas = {
     ...values,
     gender: mapGenderToNumber(values.gender),
     maleImageUrl
   };

   dispatch(updateusermain(datas)); // Dispatch action to add the user

  //  resetForm();  // Reset the form
   setImagePreview(null); // Reset the image preview
   setLoading(false);
   setMaleFiles(null);

    // Stop loading indicator
 };

  return (
    <div>
        {/* <button onClick={()=>{navigate("/")}}>Goback</button> */}
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

      <div className="form-group">
          <label>image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Handle image selection
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="error">{formik.errors.image}</div>
          ) : null}
         
        </div>

        {/* Display image preview */}
        {/* {singleuser?.maleImageUrl && (
          <div className="image-preview">
            <img src={singleuser?.maleImageUrl} alt="Preview" style={{ width: '200px', height: '200px' }} />
          </div>
        )} */}
       {/* Display the image preview */}
{imagePreview && (
  <div className="image-preview">
    <img src={imagePreview} alt="Preview" style={{ width: '200px', height: '200px' }} />
  </div>
)}

{/* Display the current image */}
{singleuser?.maleImageUrl && !imagePreview && (
  <div className="image-preview">
    <img src={singleuser.maleImageUrl} alt="Current" style={{ width: '200px', height: '200px' }} />
  </div>
)}

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
    </form>
    </div>
  );
};

export default UpdateUser;
