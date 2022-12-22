import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Button, Chip, Container, Divider, Grid, Link, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { customerApi } from '../../../../__fake-api__/customer-api';
import { restaurantApi } from '../../../../api/restaurant-api';

import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { CustomerBasicDetails } from '../../../../components/dashboard/customer/customer-basic-details';
import { CustomerDataManagement } from '../../../../components/dashboard/customer/customer-data-management';
import { CustomerEmailsSummary } from '../../../../components/dashboard/customer/customer-emails-summary';
import { CustomerInvoices } from '../../../../components/dashboard/customer/customer-invoices';
import { CustomerPayment } from '../../../../components/dashboard/customer/customer-payment';
import { CustomerLogs } from '../../../../components/dashboard/customer/customer-logs';
import { useMounted } from '../../../../hooks/use-mounted';
import { ChevronDown as ChevronDownIcon } from '../../../../icons/chevron-down';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useRouter } from 'next/router';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Payment', value: 'payment' },
  { label: 'Emails', value: 'emails' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' },
  { label: 'Data Management', value: 'data_management' },
];

const RestaurantDetails = () => {
  const router = useRouter();
  const { restaurantId } = router.query;
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getRestaurant = useCallback(async () => {
    try {
      const data = await restaurantApi.getRestaurantsById(restaurantId);

      if (isMounted()) {
        setCustomer(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getRestaurant();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Details | Material Kit Pro</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink href="/dashboard/restaurants" passHref>
                <Link color="textPrimary" component="a" sx={{ alignItems: 'center', display: 'flex' }}>
                  <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">Restaurants</Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
                <Avatar src={customer.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
                  {getInitials(customer.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">{customer.email}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2">restaurant_id:</Typography>
                    <Chip label={customer.id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink href="/dashboard/restaurants/1/edit" passHref>
                  <Button component="a" endIcon={<PencilAltIcon fontSize="small" />} sx={{ m: 1 }} variant="outlined">
                    Edit
                  </Button>
                </NextLink>
                <Button endIcon={<ChevronDownIcon fontSize="small" />} sx={{ m: 1 }} variant="contained">
                  Actions
                </Button>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map(tab => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomerBasicDetails
                    address1={customer.address1}
                    address2={customer.address2}
                    country={customer.country}
                    email={customer.email}
                    isVerified={!!customer.isVerified}
                    phone={customer.phone}
                    state={customer.state}
                  />
                </Grid>
              </Grid>
            )}
            {currentTab === 'invoices' && <CustomerInvoices />}
            {currentTab === 'payment' && <CustomerPayment />}
            {currentTab === 'emails' && <CustomerEmailsSummary />}
            {currentTab === 'logs' && <CustomerLogs />}
            {currentTab === 'data_management' && <CustomerDataManagement />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

RestaurantDetails.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default RestaurantDetails;
