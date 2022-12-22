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

import { restaurantApi } from '../../../api/restaurant-api';

import { wait } from '../../../utils/wait';
import { useRouter } from 'next/router';

export const RestaurantNewForm = props => {
  const { restaurant, handleClose, ...other } = props;
  const router = useRouter();
  const { restaurantId } = router.query;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address1: restaurant.address1 || '',
      address2: restaurant.address2 || '',
      address3: restaurant.address3 || '',
      country: restaurant.country || '',
      email: restaurant.email || '',
      hasDiscount: restaurant.hasDiscount || false,
      isVerified: restaurant.isVerified || false,
      name: restaurant.name || '',
      phone: restaurant.phone || '',
      state: restaurant.state || '',
      submit: null,
      openStatus: restaurant.openStatus || 'OPEN',
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      address3: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup.string().max(255).required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);

        await restaurantApi.addRestaurant({ restaurant_json: values });

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Restaurant added!');

        router.replace('/dashboard/restaurants');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
    onSubmit1: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Restaurant updated!');

        alert('helloworld');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Add New restaurant" />
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
                error={Boolean(formik.touched.address3 && formik.errors.address3)}
                fullWidth
                helperText={formik.touched.address3 && formik.errors.address3}
                label="Address 3"
                name="address3"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address3}
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
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Typography gutterBottom variant="subtitle1">
                Available to hire
              </Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Toggling this will let your teammates know that you are available for acquiring new projects
              </Typography>
            </div>
            <Switch
              checked={formik.values.hasDiscount}
              color="primary"
              edge="start"
              name="hasDiscount"
              onChange={formik.handleChange}
              value={formik.values.hasDiscount}
            />
          </Box>

          <Divider sx={{ my: 3 }} />
          <Grid container>
            <Grid item xs={12} md={8}>
              <div>
                <Typography gutterBottom variant="subtitle1">
                  Open status
                </Typography>
                <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                  Open, Close, Permanently Closed
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="open-status-select-label">OpenStatus</InputLabel>
                <Select
                  labelId="open-status-select-label"
                  id="openStatus"
                  name="openStatus"
                  value={formik.values.openStatus}
                  label="openStatus"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={'OPEN'}>Open</MenuItem>
                  <MenuItem value={'CLOSE'}>Close</MenuItem>
                  <MenuItem value={'PERMANENTLY_CLOSED'}>Permanently Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}></Box>
        </CardContent>
        <Divider sx={{ my: 3 }} />

        <CardActions sx={{ flexWrap: 'wrap', m: -1 }}>
          <Button
            onClick={handleClose}
            component="a"
            disabled={formik.isSubmitting}
            sx={{ m: 1, mr: 'auto' }}
            variant="outlined"
          >
            Cancel
          </Button>

          <Button disabled={formik.isSubmitting} type="submit" sx={{ m: 1 }} variant="contained">
            Add restaurant
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

RestaurantNewForm.propTypes = {
  customer: PropTypes.object.isRequired,
};
