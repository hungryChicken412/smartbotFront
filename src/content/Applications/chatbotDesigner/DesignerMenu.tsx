import React from 'react';
import { useState, ChangeEvent } from 'react';
import styles from './style.module.css';

import { nodes } from './customNodes/nodesList';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import {
  Box,
  Typography,
  Tooltip,
  styled,
  IconButton,
  Tabs,
  Tab,
  Avatar,
  Divider,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  List,
  Backdrop,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Modal,
  TextField,
  FormControlLabel,
  Switch,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Badge
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { PRO_Nodes } from './customNodes/nodesList';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);
const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);
const WarningBox = styled(Avatar)(
  ({ theme }) => `
          background-color: ${theme.colors.warning.lighter};
          color: ${theme.colors.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `
);
const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);
const tabs = [
  { value: 'base', label: 'Base' },

  { value: 'advanced', label: 'Pro' }
];
function DesignerMenu({ chatbot }) {
  const chatbotInformation = chatbot[0];

  const saveBot = chatbot[1];
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectbaseowed = 'move';
  };
  const [bot, setBot] = useState({
    name: '',
    website: '',
    caching: false,
    avatar: '',
    status: 'Development'
  });

  useEffect(() => {
    try {
      console.log(chatbotInformation);
      let b = {
        name: chatbotInformation.name,
        website: chatbotInformation.website,
        caching: chatbotInformation.caching,
        avatar: chatbotInformation.avatar,
        status: chatbotInformation.status
      };

      setlogoImage(b.avatar);
      setBot(b);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [currentTab, setCurrentTab] = useState<string>('base');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const [logoImage, setlogoImage] = useState<string>('');

  const readIconFile = (e) => {
    try {
      setlogoImage(URL.createObjectURL(e.target.files[0]));
    } catch {
      setlogoImage('');
    }
  };

  const status = useRef<HTMLDivElement>();
  const handleSettingChange = (e) => {
    e.preventDefault();

    const temp = {
      name: e.target.botname.value,
      caching: e.target.caching.checked,
      website: e.target.website.value,
      avatar: e.target.chatbot_logo.files[0],
      status: (status.current.children[1] as HTMLSelectElement).value
    };

    saveBot(temp);
  };

  return (
    <>
      <RootWrapper>
        <Box display="flex" style={{ marginTop: 4 }} alignItems="flex-start">
          <Box
            sx={{
              flex: 1,
              mb: 1
            }}
          >
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
              style={{ alignItems: 'center' }}
            >
              <Typography
                sx={{
                  mb: 1
                }}
                variant="h3"
              >
                Designer
              </Typography>
              <IconButton
                sx={{
                  p: 1
                }}
                size="small"
                color="primary"
                onClick={handleOpen}
              >
                <SettingsTwoToneIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <TabsContainerWrapper>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleTabsChange}
            value={currentTab}
            textColor="primary"
            indicatorColor="primary"
            style={{ justifyContent: 'center' }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mt: 2 }} />
        </TabsContainerWrapper>
        {currentTab == 'base' && (
          <div className={styles.menu_container}>
            {nodes.map((node) => (
              <Tooltip title={node['hint']} placement="right-start">
                <ListItemWrapper
                  onDragStart={(event) => onDragStart(event, node['id'])}
                  draggable
                >
                  <ListItemAvatar>{node['icon']}</ListItemAvatar>
                  <ListItemText
                    sx={{
                      mr: 1
                    }}
                    primaryTypographyProps={{
                      color: 'textPrimary',
                      variant: 'h5',
                      noWrap: true
                    }}
                    secondaryTypographyProps={{
                      color: 'textSecondary',
                      noWrap: true
                    }}
                    primary={node['name']}
                    secondary={node['hint']}
                  />
                </ListItemWrapper>
              </Tooltip>
            ))}
          </div>
        )}

        {currentTab == 'advanced' && (
          <List>
            <div className={styles.menu_container}>
              {PRO_Nodes.map((node) => (
                <Tooltip title={node['hint']} placement="right-start">
                  <ListItemWrapper
                    onDragStart={(event) => onDragStart(event, node['id'])}
                    draggable
                  >
                    <ListItemAvatar>
                      <Badge badgeContent={'PRO'} color="primary">
                        {node['icon']}{' '}
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        mr: 1
                      }}
                      primaryTypographyProps={{
                        color: 'textPrimary',
                        variant: 'h5',
                        noWrap: true
                      }}
                      secondaryTypographyProps={{
                        color: 'textSecondary',
                        noWrap: true
                      }}
                      primary={node['name']}
                      secondary={node['hint']}
                    />
                  </ListItemWrapper>
                </Tooltip>
              ))}
            </div>
          </List>
        )}

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
            <DialogTitle>
              <Typography
                variant="h4"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <SettingsTwoToneIcon style={{ marginRight: '8px' }} /> Manage
              </Typography>
            </DialogTitle>
            <Divider />
            <List sx={{ pt: 0 }}>
              <form onSubmit={handleSettingChange}>
                <ListItem>
                  <Tooltip title="    Name of your chatbot">
                    <TextField
                      id="botname"
                      label="   Chatbot Name"
                      required
                      defaultValue={bot.name}
                      variant="outlined"
                    />
                  </Tooltip>
                </ListItem>
                <ListItem>
                  <Tooltip title="URL of the website where it is to be hosted">
                    <TextField
                      id="website"
                      label=" Your website URL"
                      required
                      variant="outlined"
                      defaultValue={bot.website}
                      type="url"
                    />
                  </Tooltip>
                </ListItem>
                <ListItem>
                  <Tooltip title="           Your Bot Logo Here    ">
                    <div className={styles.input_logo}>
                      <label
                        className={styles.input_field_logo_label}
                        htmlFor="chatbot_logo"
                      >
                        Logo
                      </label>
                      <input
                        id="chatbot_logo"
                        style={{ display: 'none' }}
                        onChange={readIconFile}
                        type="file"
                      ></input>{' '}
                      <Avatar
                        variant="rounded"
                        alt={bot.name}
                        src={logoImage}
                      />
                    </div>
                  </Tooltip>
                </ListItem>
                <ListItem>
                  <Tooltip title="       Enable this for better performance    ">
                    <FormControl
                      sx={{
                        m: 1
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            defaultChecked={bot.caching}
                            required
                            id="caching"
                          />
                        }
                        label="   Enable Caching"
                        labelPlacement="start"
                      />{' '}
                    </FormControl>
                  </Tooltip>
                </ListItem>

                <ListItem>
                  <FormControl sx={{ m: 1, minWidth: '100%' }}>
                    <InputLabel id="bottmodelbel">Age</InputLabel>
                    <Select
                      id="bottmode"
                      labelId="bottmodelbel"
                      defaultValue={bot.status}
                      required
                      label="Age"
                      ref={status}
                    >
                      <MenuItem value="Development">Development</MenuItem>
                      <MenuItem value="Online" color="warning">
                        Online
                      </MenuItem>
                      <MenuItem value="Offline">Offline</MenuItem>
                    </Select>
                  </FormControl>
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
      </RootWrapper>
    </>
  );
}

export default DesignerMenu;
