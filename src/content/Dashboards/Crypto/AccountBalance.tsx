import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  styled,
  Avatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';

import Link from 'next/link';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

function AccountBalance() {
  const accountData = [
    {
      balance: 200,
      growthValue: "Let's Start Growing!"
    }
  ];

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Account Balance
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                ${accountData[0]['balance']}
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2
                  }}
                  variant="rounded"
                >
                  <TrendingUp fontSize="large" />
                </AvatarSuccess>
                <Box>
                  <Typography variant="h4">
                    +{accountData[0]['growthValue']}
                  </Typography>
                  <Typography variant="subtitle2" noWrap>
                    User Interactions This Month
                  </Typography>
                </Box>
              </Box>

              <Link href={'/applications/chatbotDesigner'}>
                <Button variant="outlined" color="warning">
                  {' '}
                  Create New Bot
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
