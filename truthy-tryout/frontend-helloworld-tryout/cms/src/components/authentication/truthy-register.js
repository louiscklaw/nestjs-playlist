import { useRouter } from 'next/router';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormHelperText, Link, TextField, Typography } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

YupPassword(Yup);

export const TruthyRegister = props => {
  const isMounted = useMounted();
  const router = useRouter();
  const { register } = useAuth();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '123@123.com',
      name: '123',
      password: 'Aa1234567@',
      policy: true,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      name: Yup.string().max(255).required('Name is required'),
      password: Yup.string()
        .required(
          'Password is required and contain 8 or more characters with at least one of each: uppercase, lowercase, number and special',
        )
        .min(
          8,
          'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special',
        )
        .max(255)
        .minLowercase(1, 'password must contain at least 1 lower case letter')
        .minUppercase(1, 'password must contain at least 1 upper case letter')
        .minNumbers(1, 'password must contain at least 1 number')
        .minSymbols(1, 'password must contain at least 1 special character'),
      policy: Yup.boolean().oneOf([true], 'This field must be checked'),
    }),
    onSubmit: async (values, helpers) => {
      let user = {};
      try {
        await register(values.email, values.name, values.password);

        if (isMounted()) {
          const returnUrl = router.query.returnUrl || '/dashboard';
          router.push(returnUrl).catch(console.error);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <div>{JSON.stringify(formik.values)}</div>
      <form noValidate onSubmit={formik.handleSubmit} {...props}>
        <TextField
          error={Boolean(formik.touched.name && formik.errors.name)}
          fullWidth
          helperText={formik.touched.name && formik.errors.name}
          label="Name"
          margin="normal"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />

        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />

        <Box sx={{ alignItems: 'center', display: 'flex', ml: -1, mt: 2 }}>
          <Checkbox checked={formik.values.policy} name="policy" onChange={formik.handleChange} />
          <Typography color="textSecondary" variant="body2">
            I have read the{' '}
            <Link component="a" href="#">
              Terms and Conditions
            </Link>
          </Typography>
        </Box>

        {Boolean(formik.touched.policy && formik.errors.policy) && (
          <FormHelperText error>{formik.errors.policy}</FormHelperText>
        )}

        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Button disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </form>
    </>
  );
};
