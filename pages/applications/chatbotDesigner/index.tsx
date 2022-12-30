import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import Scrollbar from '@/components/Scrollbar';
import DesignerMenu from '@/content/Applications/chatbotDesigner/DesignerMenu';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SaveIcon from '@mui/icons-material/Save';
import { nodeTypes } from '@/content/Applications/chatbotDesigner/customNodes/nodesList';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';

import {
  Box,
  styled,
  Divider,
  Typography,
  Button,
  Tooltip,
  Modal,
  DialogTitle,
  Dialog,
  Backdrop,
  List,
  ListItem
} from '@mui/material';
import toast from 'src/components/Toast';
import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  Background,
  ControlButton,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  updateEdge,
  ConnectionLineType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { baseUrl } from 'services/user.service';
import nextCookie from 'next-cookies';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppContext } from '@/contexts/global_context';

import { v4 as uuidv4 } from 'uuid';

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);

const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: #140c4f;
    color:  white;
    font-weight: bold;

    
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    
`
);

var initialNodes = [
  {
    id: 'node-0',
    type: 'entry_node',
    position: { x: 0, y: 0 },
    data: { label: '' }
  },
  {
    id: 'node-1',
    type: 'exit_node',
    position: { x: 50, y: 100 },
    data: { label: '' }
  }
];
var initialEdges = [
  { id: 'e1-2', source: 'node-0', target: 'node-1', type: 'step' }
];
const initialBotDetails = {
  name: 'New Bot',
  caching: false,
  website: '',
  avatar: '',
  status: 'Development',
  tokenID: 'TEST1234'
};

const minimapStyle = {
  height: 100
};

function DesignChatbot({ chatbotInformation }) {
  const router = useRouter();
  const appContext = useAppContext();

  /*  INITIALIZE REACTFLOW*/
  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [botDetails, setBotDetails] = useState(initialBotDetails);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge({ ...params, type: 'step' }, els)),
    []
  );
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);
  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);
  /* END */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });
      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: `` }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const query = router.query;

  useEffect(() => {
    if (query['id'] && chatbotInformation.name) {
      console.log('here');
      notify('success', ' Editing ' + chatbotInformation.name);

      //console.log(JSON.parse(JSON.parse(chatbotInformation.chatbotData).edges));
      setNodes(JSON.parse(chatbotInformation.chatbotData).nodes);
      setEdges(JSON.parse(chatbotInformation.chatbotData).edges);
      setBotDetails(JSON.parse(chatbotInformation.chatbotData).details);
    } else {
      notify('info', ' Editing new chatbot');
    }
  }, []);

  function saveChatBot(temp?) {
    var body = {
      nodes: nodes,
      edges: edges,
      details: temp.name ? temp : botDetails,

      id: query['id'] && chatbotInformation.name ? query['id'] : -1
    };

    console.log(body);
    const fd = new FormData();
    fd.append('avatar', temp.name ? temp.avatar : null);
    fd.append('body', JSON.stringify(body));

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Token ${appContext.cookie}`
      },

      body: fd
    };
    fetch(baseUrl + '/saveChatbot/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        notify('success', ' Chatbot Saved');
        router.push('/applications/chatbotDesigner?id=' + data['id']);
        window.open('/applications/chatbotDesigner?id=' + data['id'], '_self');

        console.log(data);
      })
      .catch((error) => {
        notify('error', ' Something went wrong');
        console.error('There was an error!', error);
      });
  }

  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  }
  function copyText(e) {
    // Get the text field

    console.log(htmlDecode(e.target.innerHTML));
    console.log(e.target.value);
    navigator.clipboard.writeText(htmlDecode(e.target.innerHTML));

    notify('info', ' Text Copied');
  }
  return (
    <>
      <Head>
        <title>Chatbot Design</title>
      </Head>
      <RootWrapper className="Mui-FixedWrapper">
        <Sidebar
          sx={{
            display: { xs: 'none', lg: 'inline-block' }
          }}
        >
          <Scrollbar>
            <DesignerMenu chatbot={[chatbotInformation, saveChatBot]} />
          </Scrollbar>
        </Sidebar>
        <ChatWindow>
          <ReactFlowProvider>
            <ReactFlow
              ref={reactFlowWrapper}
              nodes={nodes}
              edges={edges}
              connectionLineType={ConnectionLineType.Step}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              snapToGrid
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onConnect={onConnect}
              fitView
              attributionPosition="top-right"
              onDrop={onDrop}
              onDragOver={onDragOver}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
            >
              <Background />
              <div className="updatenode__controls">
                <Tooltip title="Save">
                  <Button
                    variant="contained"
                    style={{ margin: 2 }}
                    onClick={saveChatBot}
                  >
                    {' '}
                    <SaveIcon />{' '}
                  </Button>
                </Tooltip>
                <Tooltip title="Deploy">
                  <Button
                    variant="contained"
                    style={{ margin: 2 }}
                    onClick={handleOpen}
                  >
                    {' '}
                    <PlayLessonIcon />{' '}
                  </Button>
                </Tooltip>
              </div>
              <Controls showInteractive={false}>
                <ControlButton>
                  <Tooltip
                    arrow
                    title="About Information"
                    placement="right-start"
                  >
                    <Button>
                      <HelpCenterIcon />
                    </Button>
                  </Tooltip>
                </ControlButton>
              </Controls>
              <MiniMap style={minimapStyle} zoomable pannable />
            </ReactFlow>
          </ReactFlowProvider>
        </ChatWindow>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
                  Manage
                </Typography>
              </DialogTitle>
              <Divider />
              <List sx={{ pt: 0 }}>
                <ListItem>
                  <Typography variant="subtitle2">
                    Paste this line inside the{' '}
                    <LabelWrapper>
                      {'<'}head{'>'}
                    </LabelWrapper>{' '}
                    component
                  </Typography>
                </ListItem>
                <ListItem>
                  <Tooltip title=" Paste these code line inside the <head> component ">
                    <div onClick={copyText} className="modal_copy_field_here">
                      {' '}
                      {`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
    integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <link rel="stylesheet" href="https://orangewaves.tech/static/chatbot_cdn/chatbot.css">`}
                    </div>
                  </Tooltip>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle2">
                    Paste this line inside the{' '}
                    <LabelWrapper>
                      {'<'}body{'>'}
                    </LabelWrapper>{' '}
                    component
                  </Typography>
                </ListItem>
                <ListItem>
                  <Tooltip title="     Paste these code line inside the <head> component   ">
                    <div onClick={copyText} className="modal_copy_field_here">
                      {`<section class="smartbot-section" name="smartbot-section" id="${
                        !chatbotInformation.name
                          ? botDetails.tokenID
                          : chatbotInformation.tokenID
                      }">
    <script src="https://orangewaves.tech/static/chatbot_cdn/chatbot.js"></script>
  </section>`}
                    </div>
                  </Tooltip>
                </ListItem>

                <ListItem style={{ justifyContent: 'center  ' }}>
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </ListItem>
              </List>
            </Dialog>
          </Modal>
        </Modal>
      </RootWrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  var query = ctx.query;

  if (!query['id']) {
    return { props: { chatbotInformation: {} } };
  }

  const requestOptions = {
    method: 'GET',
    headers: { Authorization: `Token ${nextCookie(ctx)['token']}` }
  };

  const res = await fetch(
    baseUrl + '/chatbotsEdit/' + query['id'],
    requestOptions
  );
  const json = await res.json();

  if (!json[0]) {
    console.log('here');
    return {
      redirect: {
        permanent: false,
        destination: '/applications/chatbotDesigner'
      },
      props: {}
    };
  }
  console.log('herhifg');

  return { props: { chatbotInformation: json[0] } };
}

DesignChatbot.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DesignChatbot;
