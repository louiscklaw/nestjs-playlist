import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from '../../../../__fake-api__/customer-api';
import { restaurantApi } from '../../../../api/restaurant-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { RestaurantEditForm } from '../../../../components/dashboard/restaurant/restaurant-edit-form';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useRouter } from 'next/router';

const RestaurantEdit = () => {
  const router = useRouter();
  const { restaurantId } = router.query;

  const isMounted = useMounted();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await restaurantApi.getRestaurantsById(restaurantId);
      console.log({ data });
      setRestaurant(data);

      if (isMounted()) {
        setRestaurant(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getCustomer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );


  if (!restaurant) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | Material Kit Pro</title>
      </Head>
      {/* <pre>{JSON.stringify(restaurant, null, 2)}</pre> */}
      <Box component="main" sx={{ backgroundColor: 'background.default', flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/dashboard/restaurants" passHref>
              <Link color="textPrimary" component="a" sx={{ alignItems: 'center', display: 'flex' }}>
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Restaurants</Typography>
              </Link>
            </NextLink>
          </Box>
          <Box sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
            <Avatar src={restaurant.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
              {getInitials(restaurant.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {restaurant.email}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography variant="subtitle2">user_id:</Typography>
                <Chip label={restaurant.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <RestaurantEditForm restaurant={restaurant} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

RestaurantEdit.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default RestaurantEdit;
