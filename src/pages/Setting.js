import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import actions from "../redux/actions/user";
import {Container, Stack, TextField, Typography} from "@mui/material";
import UploadComponent from "../components/UploadComponent";
import {LoadingButton} from "@mui/lab";
import Page from "../components/Page";


function Setting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SettingSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(4, 'Must be at least 8 characters')
      .max(20, 'Must be less  than 20 characters'),
    description: Yup.string()
      .required('Description is required'),
    username: Yup.string()
      .required('Username is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    feature: true,
    lastName: Yup.string()
      .min(4, 'Must be at least 8 characters')
      .max(20, 'Must be less  than 20 characters'),
    files: Yup.mixed().required()
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      description: '',
      username: '',
      email: '',
      feature: '',
      remember: true,
    },
    validationSchema: SettingSchema,
    onSubmit: (values) => {
      dispatch(actions.login({
        "firstName": values?.firstName,
        "lastName": values?.lastName,
      }, () => {
        setTimeout(() => navigate('/dashboard/app', {replace: true}), 500);
      }))
    },
  });

  const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

  return (
    <Page title="Setting">
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction={'row'} spacing={2}>
                <TextField
                  fullWidth
                  autoComplete="firstName"
                  type="firstName"
                  label="First Name"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  fullWidth
                  autoComplete="lastName"
                  type={'text'}
                  label="Last Name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />

              </Stack>
              <Stack direction={'row'} spacing={2}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="username"
                  label="Username"
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />

                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
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

              <TextField
                fullWidth
                autoComplete="feature"
                type={'text'}
                label="Feature"
                {...getFieldProps('feature')}
                error={Boolean(touched.feature && errors.feature)}
                helperText={touched.feature && errors.feature}
              />

              <Stack>
                <Typography>
                  Avatar
                </Typography>
                <UploadComponent setFieldValue={formik.setFieldValue}/>
              </Stack>
            </Stack>

            <LoadingButton fullWidth size="large"
                           username="submit"
                           variant="contained"
                           className="bg-[#2065D1]"
                           loading={isSubmitting}>
              Create a Product
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default Setting;
