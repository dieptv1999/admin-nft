import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {useFormik, Form, FormikProvider} from 'formik';
import {Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useDispatch} from "react-redux";
import actions from "../redux/actions/user";
import UploadComponent from "./UploadComponent";

// ----------------------------------------------------------------------

export default function CreateProductForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ProductSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Must be at least 8 characters')
      .max(20, 'Must be less  than 20 characters')
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required'),
    type: true,
    origin: true,
    feature: true,
    trademark: Yup.string()
      .min(4, 'Must be at least 8 characters')
      .max(20, 'Must be less  than 20 characters')
      .required('Trademark is required'),
    files: Yup.mixed().required()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      trademark: '',
      description: '',
      type: '',
      origin: '',
      feature: '',
      remember: true,
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      dispatch(actions.login({
        "name": values?.name,
        "trademark": values?.trademark,
      }, () => {
        setTimeout(() => navigate('/dashboard/app', {replace: true}), 500);
      }))
    },
  });

  const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={'row'} spacing={2}>
            <TextField
              fullWidth
              autoComplete="name"
              type="name"
              label="Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              autoComplete="trademark"
              type={'text'}
              label="Trademark"
              {...getFieldProps('trademark')}
              error={Boolean(touched.trademark && errors.trademark)}
              helperText={touched.trademark && errors.trademark}
            />

          </Stack>

          <TextField
            fullWidth
            multiline
            autoComplete="description"
            type={'text'}
            rows={4}
            maxRows={8}
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <Stack direction={'row'} spacing={2}>
            <TextField
              fullWidth
              autoComplete="type"
              type="type"
              label="Type"
              {...getFieldProps('type')}
              error={Boolean(touched.type && errors.type)}
              helperText={touched.type && errors.type}
            />

            <TextField
              fullWidth
              autoComplete="origin"
              type={'text'}
              label="Origin"
              {...getFieldProps('origin')}
              error={Boolean(touched.origin && errors.origin)}
              helperText={touched.origin && errors.origin}
            />

          </Stack>

          <TextField
            fullWidth
            autoComplete="feature"
            type={'text'}
            label="Feature"
            {...getFieldProps('feature')}
            error={Boolean(touched.feature && errors.feature)}
            helperText={touched.feature && errors.feature}
          />

          <UploadComponent setFieldValue={formik.setFieldValue}/>
        </Stack>

        <LoadingButton fullWidth size="large"
                       type="submit"
                       variant="contained"
                       className="bg-[#2065D1]"
                       loading={isSubmitting}>
          Create a Product
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
