import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField
} from '@mui/material';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Text from '@/components/Text';
import Label from '@/components/Label';
import toast from 'src/components/Toast';
import { useCallback } from 'react';

function EditProfileTab({ info }) {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();

    notify('info', ' Profile Saved');

    handleClose();
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Personal Details
                </Typography>
                <Typography variant="subtitle2">
                  Manage informations related to your personal details
                </Typography>
              </Box>
              <Button
                variant="text"
                onClick={handleOpen}
                startIcon={<EditTwoToneIcon />}
              >
                Edit
              </Button>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>
                        {' '}
                        {info['first_name']} {info['last_name']}
                      </b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Joined:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b> {info['created']}</b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Email:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                      <Text color="black">{info['email']}</Text>
                      {info['email_confirmed'] && (
                        <Label color="success"> Confirmed</Label>
                      )}
                      {!info['email_confirmed'] && (
                        <Label color="error"> Not Confirmed</Label>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Subscription Details
                </Typography>
                <Typography variant="subtitle2">
                  Manage details related to your subscription
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Plan:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <Label color="info">
                        <p> PRO</p>
                      </Label>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Length:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b> Unlimited </b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Status:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Label color="success">
                      <b>Active</b>
                    </Label>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle> Change Account Details Here</DialogTitle>
          <List sx={{ pt: 0 }}>
            <form onSubmit={onSubmit}>
              <ListItem>
                <TextField
                  id="firstname"
                  label="First Name"
                  variant="outlined"
                  defaultValue={info['first_name']}
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="lastname"
                  label="Last Name"
                  variant="outlined"
                  defaultValue={info['last_name']}
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="companyUrl"
                  label=" Company URL "
                  variant="outlined"
                  defaultValue={info['companyUrl']}
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="Email"
                  label=" Email "
                  variant="outlined"
                  color="error"
                  disabled={info['email_confirmed']}
                  defaultValue={info['email']}
                />
              </ListItem>
              <ListItem style={{ justifyContent: 'center  ' }}>
                <Button variant="outlined" type="submit">
                  Save
                </Button>
              </ListItem>
            </form>
          </List>
        </Dialog>
      </Modal>
    </>
  );
}

export default EditProfileTab;
