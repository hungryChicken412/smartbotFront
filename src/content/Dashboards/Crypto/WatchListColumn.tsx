import { Card, Box, Typography, Grid, useTheme } from '@mui/material';
import Label from 'src/components/Label';
import Text from 'src/components/Text';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';

function WatchListColumn({ bots }) {
  const theme = useTheme();

  return (
    <Grid
      container
      direction="row"
      justifyContent="start"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item md={12} xs={12} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {bots.map((item) => (
          <Card
            sx={{
              margin: 3,
              overflow: 'visible'
            }}
            key={item.id}
          >
            <Box
              sx={{
                p: 3
              }}
            >
              <Box display="flex" alignItems="center">
                <Box>
                  <Typography variant="h3" noWrap>
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {item.website}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  pt: 3
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    pr: 1,
                    mb: 1
                  }}
                ></Typography>
                <Text color="success">
                  <b>{item.interactions.growth}%</b>
                </Text>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
              >
                <Label color="success">
                  +
                  {item.interactions.last_week_total -
                    item.interactions.week_before_last}
                </Label>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    pl: 1
                  }}
                >
                  from last week
                </Typography>
              </Box>
            </Box>
            <Chart
              options={
                {
                  chart: {
                    background: 'transparent',
                    toolbar: {
                      show: false
                    },
                    sparkline: {
                      enabled: true
                    },
                    zoom: {
                      enabled: false
                    }
                  },
                  fill: {
                    gradient: {
                      shade: 'light',
                      type: 'vertical',
                      shadeIntensity: 0.1,
                      inverseColors: false,
                      opacityFrom: 0.8,
                      opacityTo: 0,
                      stops: [0, 100]
                    }
                  },
                  colors: [theme.colors.primary.main],
                  dataLabels: {
                    enabled: false
                  },
                  theme: {
                    mode: theme.palette.mode
                  },
                  stroke: {
                    show: true,
                    colors: [theme.colors.primary.main],
                    width: 3
                  },
                  legend: {
                    show: false
                  },
                  labels: Object.keys(item.interactions.last_week),

                  xaxis: {
                    labels: {
                      show: false
                    },
                    axisBorder: {
                      show: false
                    },
                    axisTicks: {
                      show: false
                    }
                  },
                  yaxis: {
                    show: false,
                    tickAmount: 5
                  },
                  tooltip: {
                    x: {
                      show: true
                    },
                    y: {
                      title: {
                        formatter: function () {
                          return 'Users:';
                        }
                      }
                    },
                    marker: {
                      show: false
                    }
                  }
                } as ApexOptions
              }
              series={[
                {
                  data: Object.values(item.interactions.last_week) as number[]
                }
              ]}
              type="bar"
              height={200}
            />
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}

export default WatchListColumn;
