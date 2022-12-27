import EmailIcon from '@mui/icons-material/Email';
import StartIcon from '@mui/icons-material/Start';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ChatBubble } from '@mui/icons-material';
import MessageNode from '@/content/Applications/chatbotDesigner/customNodes/CustomMessage';
import EntryNode from '@/content/Applications/chatbotDesigner/customNodes/EntryNode';
import ExitNode from '@/content/Applications/chatbotDesigner/customNodes/ExitNode';
import UserMessageNode from '@/content/Applications/chatbotDesigner/customNodes/UserMessageNode';
import SendImageNode from './sendImagenode';
import SendLinksNode from './SendLinksNode';
import AddLinkIcon from '@mui/icons-material/AddLink';
import HelpIcon from '@mui/icons-material/Help';
import BugReportIcon from '@mui/icons-material/BugReport';
import SaveIcon from '@mui/icons-material/Save';

import ImageIcon from '@mui/icons-material/Image';
import AskQuestionNode from '@/content/Applications/chatbotDesigner/customNodes/questionNode';
import OpenTicketNode from '@/content/Applications/chatbotDesigner/customNodes/OpenTicketNode';
import sendEmailNode from '@/content/Applications/chatbotDesigner/customNodes/sendEmailNode';
import saveChatNode from '@/content/Applications/chatbotDesigner/customNodes/saveChatNode';

export const nodes = [
  {
    name: 'Entry Node',
    icon: <StartIcon />,
    id: 'entry_node',
    key: 1,
    hint: ' Every workflow must have only one entry node'
  },
  {
    name: 'Send Message',
    icon: <EmailIcon />,
    id: 'message_node',
    key: 2,
    hint: ' Send a message to the user'
  },
  {
    name: ' User Message ',
    icon: <ChatBubble />,
    id: 'user_message',
    key: 3,
    hint: " Get the user's message"
  },
  {
    name: ' Exit Node ',
    icon: <ExitToAppIcon />,
    id: 'exit_node',
    key: 0,
    hint: ' Every  workflow must have an exit node'
  },
  {
    name: '  Send Link ',
    icon: <AddLinkIcon />,
    id: 'send_link',
    key: 4,
    hint: ' Send a link to the user (Includes Preview)'
  },
  {
    name: 'Send an Image',
    icon: <ImageIcon />,
    id: 'send_image',
    key: 6,
    hint: ' This node is used to send an image to the user '
  },
  {
    name: 'Ask Question',
    icon: <HelpIcon />,
    id: 'ask_question',
    key: 7,
    hint: ' Ask a question to the user, this can be used in surveys or forms'
  }
];

export const OperationNodes = [
  {
    name: 'Open Ticket',
    icon: <BugReportIcon />,
    id: 'open_ticket',
    key: 5,
    hint: ' Open a support ticket for the user'
  },
  {
    name: 'Save Chat',
    icon: <SaveIcon />,
    id: 'save_log',
    key: 8,
    hint: ' Save the chat log '
  },
  {
    name: 'Send Email',
    icon: <EmailIcon />,
    id: 'send_email',
    key: 9,
    hint: ' Send an email to the given email'
  }
];

export const nodeTypes = {
  message_node: MessageNode,
  entry_node: EntryNode,
  exit_node: ExitNode,
  user_message: UserMessageNode,
  send_link: SendLinksNode,

  send_image: SendImageNode,
  ask_question: AskQuestionNode,

  open_ticket: OpenTicketNode,
  save_log: saveChatNode,
  send_email: sendEmailNode
};
