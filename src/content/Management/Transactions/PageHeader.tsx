import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useAppContext } from '@/contexts/global_context';

import Link from 'next/link';

function PageHeader() {
  const appContext = useAppContext();

  const user = {
    name: appContext.username
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Chatbots
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are the chatbots that you have created.
        </Typography>
      </Grid>
      <Grid item>
        <Link href="/applications/chatbotDesigner">
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="outlined"
            color="warning"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Create New
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
