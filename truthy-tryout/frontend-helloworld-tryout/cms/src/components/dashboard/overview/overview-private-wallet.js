import { Avatar, Box, Button, Card, CardActions, Divider, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { Chart } from '../../chart';

export const OverviewPrivateWallet = props => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: { show: false },
    },
    colors: [theme.palette.secondary.light],
    fill: { opacity: 1 },
    labels: [],
    plotOptions: {
      radialBar: {
        dataLabels: { show: false },
        hollow: { size: '40%' },
        track: { background: theme.palette.secondary.dark },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = [76];

  return (
    <Card {...props}>
      <Box
        sx={{
          alignItems: { sm: 'center' },
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' },
          padding: '1rem',
        }}
      >
        <Grid container justifyContent={'center'} alignItems={'center'}>
          <Grid item xl={4} container justifyContent="center" alignItems="center" sx={{}}>
            <Chart height={'100%'} options={chartOptions} series={chartSeries} type="radialBar" width={'100%'} />
          </Grid>
          <Grid item xl={4} container justifyContent="center" alignItems="center" sx={{}}>
            <Box>
              <Typography color="secondary" variant="h4">
                999
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                総客数
              </Typography>
            </Box>
          </Grid>
          <Grid item xl={4} container justifyContent="center" alignItems="center" sx={{}}>
            <Avatar
              sx={{
                backgroundColor: alpha(theme.palette.error.main, 0.08),
                color: 'error.main',
              }}
              variant="rounded"
            >
              <ChevronDownIcon fontSize="small" />
            </Avatar>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <CardActions>
        <Button endIcon={<ArrowRightIcon fontSize="small" />}>Withdraw money</Button>
      </CardActions>
    </Card>
  );
};
