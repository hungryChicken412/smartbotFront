import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useAppContext } from '@/contexts/global_context';

import Link from 'next/link';

function PageHeader({ props }) {
  const appContext = useAppContext();

  const user = {
    name: appContext.username
  };
  console.log(props);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, {props.detail}
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
