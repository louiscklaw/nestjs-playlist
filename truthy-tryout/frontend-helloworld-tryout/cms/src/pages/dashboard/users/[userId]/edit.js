import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from '../../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { UserEditForm } from '../../../../components/dashboard/user/user-edit-form';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useRouter } from 'next/router';

const UserEdit = () => {
  const router = useRouter();
  const { userId } = router.query;

  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

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

  const [user_info, setUserInfo] = useState({});

  const getUserById = async () => {
    return fetch(`//localhost:7777/users/${userId}`, { method: 'GET', credentials: 'include' }).then(res => res.json());
  };

  useEffect(() => {
    getUserById().then(res_json => setUserInfo(res_json));
  }, []);

  if (user_info == {}) return <>loading</>;

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | Material Kit Pro</title>
      </Head>

      <Box component="main" sx={{ backgroundColor: 'background.default', flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/dashboard/users" passHref>
              <Link color="textPrimary" component="a" sx={{ alignItems: 'center', display: 'flex' }}>
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Users</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
            <Avatar src={user_info.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
              {getInitials(user_info.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {user_info.email}
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
                <Chip label={user_info.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>

          <Box mt={3}>
            <UserEditForm user_info={user_info} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserEdit.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default UserEdit;
