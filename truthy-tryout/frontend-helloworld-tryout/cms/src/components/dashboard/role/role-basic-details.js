import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader, Divider, useMediaQuery, Box } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

export const RoleBasicDetails = props => {
  const { roleInfo, userInfo, status, address1, address2, country, email, isVerified, phone, state, ...other } = props;
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  if (!roleInfo?.permission) return <>loading</>;

  return (
    <>
      <Card {...other}>
        <CardHeader title="Basic Details" />
        <Divider />

        <PropertyList>
          <PropertyListItem align={align} divider label="createdAt" value={roleInfo.createdAt} />
          <PropertyListItem align={align} divider label="updatedAt" value={roleInfo.updatedAt} />
          <PropertyListItem align={align} divider label="name" value={roleInfo.name} />
          <PropertyListItem align={align} divider label="description" value={roleInfo.description} />
        </PropertyList>

        <Box>
          {roleInfo.permission.map(permission => {
            return (
              <>
                <CardHeader title={`Resource Name: ${permission.resource}`} />
                <Divider />

                <PropertyList>
                  <PropertyListItem align={align} divider label="updatedAt" value={permission.updatedAt} />
                  <PropertyListItem align={align} divider label="path" value={permission.path} />
                </PropertyList>
              </>
            );
          })}

          <CardActions sx={{ flexWrap: 'wrap', px: 3, py: 2, m: -1 }}>
            <Button sx={{ m: 1 }} variant="outlined">
              Reset &amp; Send Password
            </Button>
            <Button sx={{ m: 1 }}>Login as Customer</Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

RoleBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string,
};
