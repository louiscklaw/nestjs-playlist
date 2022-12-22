import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';

export const RestaurantListTable = props => {
  const {
    restaurants,
    restaurantsCount,
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedRestaurants.length) {
        setSelectedRestaurants([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [restaurants],
  );

  const handleSelectAllCustomers = event => {
    setSelectedRestaurants(event.target.checked ? restaurants.map(restaurant => restaurant.id) : []);
  };

  const handleSelectOneCustomer = (event, restaurantId) => {
    if (!selectedRestaurants.includes(restaurantId)) {
      setSelectedRestaurants(prevSelected => [...prevSelected, restaurantId]);
    } else {
      setSelectedRestaurants(prevSelected => prevSelected.filter(id => id !== restaurantId));
    }
  };

  const enableBulkActions = selectedRestaurants.length > 0;
  const selectedSomeCustomers = selectedRestaurants.length > 0 && selectedRestaurants.length < restaurants.length;
  const selectedAllCustomers = selectedRestaurants.length === restaurants.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: theme => (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100'),
          display: enableBulkActions ? 'block' : 'none',
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllCustomers}
          indeterminate={selectedSomeCustomers}
          onChange={handleSelectAllCustomers}
        />
        <Button size="small" sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllCustomers}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCustomers}
                />
              </TableCell>
              <TableCell>Restaurant Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Spent</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {restaurants.map(restaurant => {
              const isRestaurantSelected = selectedRestaurants.includes(restaurant.id);

              return (
                <TableRow hover key={restaurant.id} selected={isRestaurantSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isRestaurantSelected}
                      onChange={event => handleSelectOneCustomer(event, restaurant.id)}
                      value={isRestaurantSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <Avatar src={restaurant.avatar} sx={{ height: 42, width: 42 }}>
                        {getInitials(restaurant.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink href="/dashboard/restaurants/1" passHref>
                          <Link color="inherit" variant="subtitle2">
                            {restaurant.name}
                          </Link>
                        </NextLink>
                        <Typography color="textSecondary" variant="body2">
                          {restaurant.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{`${restaurant.city}, ${restaurant.state}, ${restaurant.country}`}</TableCell>
                  <TableCell>{restaurant.totalOrders}</TableCell>
                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {numeral(restaurant.totalAmountSpent).format(`${restaurant.currency}0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink href={`/dashboard/restaurants/${restaurant.id}/edit`} passHref>
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink href={`/dashboard/restaurants/${restaurant.id}`} passHref>
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={customersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

RestaurantListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
