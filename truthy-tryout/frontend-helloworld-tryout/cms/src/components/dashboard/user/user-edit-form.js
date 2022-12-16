import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { wait } from '../../../utils/wait';

export const UserEditForm = props => {
  const { user_info, ...other } = props;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address1: user_info.address1 || '',
      address2: user_info.address2 || '',
      country: user_info.country || '',
      email: user_info.email || '',
      hasDiscount: user_info.hasDiscount || false,
      isVerified: user_info.isVerified || false,
      name: user_info.name || '',
      phone: user_info.phone || '',
      state: user_info.state || '',
      status: user_info.status || 'active',
      submit: null,
    },
    validationSchema: Yup.object({
      // address1: Yup.string().max(255),
      // address2: Yup.string().max(255),
      // country: Yup.string().max(255),
      // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      // hasDiscount: Yup.bool(),
      // isVerified: Yup.bool(),
      // name: Yup.string().max(255).required('Name is required'),
      // phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log('submit?');
        fetch('//localhost:7777/users/1', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: values.name,
            email: values.email,
            name: values.name,
            contact: 'updated ?',
            address1: values.address1,
            address2: values.address2,
            country: values.country,
            // isVerified: true,
            phone: values.phone,
            state: values.state,
            status: values.status,
            // isTwoFAEnabled: false,
            // role: {
            //   id: 1,
            //   name: 'superuser',
            // },
          }),
        })
          .then(res => res.json())
          .then(resJson => {
            console.log(resJson);
            toast.success('Customer updated!');
          });

        // NOTE: Make API request
        // await wait(500);
        // helpers.setStatus({ success: true });
        // helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleDeleteUserClick = () => {
    fetch(`//locahost:7777/users/${user_info.id}`, { method: 'DELETE', credentials: 'include' })
      .then(res => res.json())
      .then(resJson => console.log('helloworld delete'));
  };

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit user" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Full name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.country && formik.errors.country)}
                fullWidth
                helperText={formik.touched.country && formik.errors.country}
                label="Country"
                name="country"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.state && formik.errors.state)}
                fullWidth
                helperText={formik.touched.state && formik.errors.state}
                label="State/Region"
                name="state"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.address1 && formik.errors.address1)}
                fullWidth
                helperText={formik.touched.address1 && formik.errors.address1}
                label="Address 1"
                name="address1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address1}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.address2 && formik.errors.address2)}
                fullWidth
                helperText={formik.touched.address2 && formik.errors.address2}
                label="Address 2"
                name="address2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address2}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone number"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
          </Grid>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <div>
              <Typography gutterBottom variant="subtitle1">
                Make Contact Info Public
              </Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Means that anyone viewing your profile will be able to see your contacts details
              </Typography>
            </div>
            <Switch
              checked={formik.values.isVerified}
              color="primary"
              edge="start"
              name="isVerified"
              onChange={formik.handleChange}
              value={formik.values.isVerified}
            />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <Typography gutterBottom variant="subtitle1">
                  Account enabled
                </Typography>
                <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                  Toggling this will enable / disable account
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="status"
                    value={formik.values.status}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    // onChange={handleStatusChange}
                  >
                    <MenuItem value={'active'}>active</MenuItem>
                    <MenuItem value={'inactive'}>inactive</MenuItem>
                    <MenuItem value={'blocked'}>blocked</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions sx={{ flexWrap: 'wrap', m: -1 }}>
          <Button disabled={formik.isSubmitting} type="submit" sx={{ m: 1 }} variant="contained">
            Update
          </Button>
          <NextLink href={`/dashboard/users/${user_info.id}`} passHref>
            <Button component="a" disabled={formik.isSubmitting} sx={{ m: 1, mr: 'auto' }} variant="outlined">
              Cancel
            </Button>
          </NextLink>
          <Button
            onClick={e => handleDeleteUserClick(e)}
            color="error"
            disabled={formik.isSubmitting}
            sx={{ display: 'none' }}
          >
            Delete user
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

UserEditForm.propTypes = {
  user_info: PropTypes.object.isRequired,
};
