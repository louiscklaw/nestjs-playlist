import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Button, Chip, Container, Divider, Grid, Link, Tab, Tabs, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from '../../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { RoleBasicDetails } from '../../../../components/dashboard/role/role-basic-details';
import { CustomerDataManagement } from '../../../../components/dashboard/user/user-data-management';
import { CustomerEmailsSummary } from '../../../../components/dashboard/user/user-emails-summary';
import { CustomerInvoices } from '../../../../components/dashboard/user/user-invoices';
import { CustomerPayment } from '../../../../components/dashboard/user/user-payment';
import { CustomerLogs } from '../../../../components/dashboard/user/user-logs';
import { useMounted } from '../../../../hooks/use-mounted';
import { ChevronDown as ChevronDownIcon } from '../../../../icons/chevron-down';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useRouter } from 'next/router';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' },
];

const RoleDetails = () => {
  const router = useRouter();
  const { roleId } = router.query;

  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();

      if (isMounted()) {
        setCustomer(data);
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

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getRoleById = async () => {
    return fetch(`//localhost:7777/roles/${roleId}`, { method: 'GET', credentials: 'include' }).then(res => res.json());
  };

  const [roleInfo, setRoleInfo] = useState({});
  useEffect(() => {
    getRoleById(1).then(resJson => setRoleInfo(resJson));
  }, []);

  // return (
  //   <>
  //     <pre>{JSON.stringify(roleInfo, null, 2)}</pre>;
  //   </>
  // );

  if (roleInfo == {}) return <>loading</>;

  return (
    <>
      <Head>
        <title>Dashboard: Customer Details | Material Kit Pro</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink href="/dashboard/roles" passHref>
                <Link color="textPrimary" component="a" sx={{ alignItems: 'center', display: 'flex' }}>
                  <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">Roles</Typography>
                </Link>
              </NextLink>
            </Box>

            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
                <Avatar src={roleInfo.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
                  {getInitials(roleInfo.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">{roleInfo.email}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2">role_id:</Typography>
                    <Chip label={roleInfo.id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink href={`/dashboard/roles/1/edit`} passHref>
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
                  <RoleBasicDetails
                    roleInfo={roleInfo}
                    userInfo={roleInfo}
                    address1={roleInfo.address1}
                    address2={roleInfo.address2}
                    country={roleInfo.country}
                    email={roleInfo.email}
                    isVerified={!!roleInfo.isVerified}
                    phone={roleInfo.phone}
                    state={roleInfo.state}
                    createdAt={roleInfo.createdAt}
                    updatedAt={roleInfo.updatedAt}
                  />
                </Grid>
              </Grid>
            )}

            {currentTab === 'invoices' && <CustomerInvoices />}
            {currentTab === 'logs' && <CustomerLogs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

RoleDetails.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default RoleDetails;
