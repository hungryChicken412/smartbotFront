import EmailIcon from '@mui/icons-material/Email';
import StartIcon from '@mui/icons-material/Start';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ChatBubble } from '@mui/icons-material';
import MessageNode from '@/content/Applications/chatbotDesigner/customNodes/base_nodes/CustomMessage';
import EntryNode from '@/content/Applications/chatbotDesigner/customNodes/base_nodes/EntryNode';
import ExitNode from '@/content/Applications/chatbotDesigner/customNodes/base_nodes/ExitNode';
import UserMessageNode from '@/content/Applications/chatbotDesigner/customNodes/base_nodes/UserMessageNode';
import SendImageNode from './base_nodes/sendImagenode';
import SendLinksNode from './base_nodes/SendLinksNode';
import AddLinkIcon from '@mui/icons-material/AddLink';
import HelpIcon from '@mui/icons-material/Help';
import BugReportIcon from '@mui/icons-material/BugReport';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SaveIcon from '@mui/icons-material/Save';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';

import ImageIcon from '@mui/icons-material/Image';
import AskQuestionNode from '@/content/Applications/chatbotDesigner/customNodes/base_nodes/questionNode';
import OpenTicketNode from '@/content/Applications/chatbotDesigner/customNodes/prof_nodes/OpenTicketNode';
import sendEmailNode from '@/content/Applications/chatbotDesigner/customNodes/prof_nodes/sendEmailNode';
import saveChatNode from '@/content/Applications/chatbotDesigner/customNodes/_saveChatNode';
import PRO_ChatSentimentNode from './prof_nodes/ChatSentimentAINode';
import PRO_AnalyseSentimentNode from './prof_nodes/AnalyseSentimentNode';
import PRO_AutoRespond from './prof_nodes/AutoRespondNode';
import PRO_UserState from './UserStateNode';
import PRO_ArticleAnwser from './prof_nodes/ArticleAnswerNode';

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

export const PRO_Nodes = [
  {
    name: 'Analyze Sentiment',
    icon: <AutoGraphIcon />,
    id: 'analyseSentiment_node',
    key: 10,
    hint: ' Analyze the sentiment of the user message'
  },
  {
    name: 'Process Sentiment',
    icon: <LibraryBooksIcon />,
    id: 'sentiment_node',
    key: 11,
    hint: ' Classify the sentiment of the user message'
  },
  {
    name: 'Auto Respond',
    icon: <AppShortcutIcon />,
    id: 'autorespond_node',
    key: 12,
    hint: ' Auto respond to the user message'
  },
  {
    name: 'User State',
    icon: <ContactPageIcon />,
    id: 'userstate_node',
    key: 13,
    hint: ' Get the user state'
  },
  {
    name: 'Answer from Document',
    icon: <ArticleIcon />,
    id: 'document_node',
    key: 14,
    hint: ' Get the answer from the attached document.'
  },
  {
    name: 'Answer from FAQs',
    icon: <CommentIcon />,
    id: 'chat_node',
    key: 15,
    hint: ' Get the answer from the attached FAQs.'
  },
  {
    name: 'Open Ticket',
    icon: <BugReportIcon />,
    id: 'open_ticket',
    key: 5,
    hint: ' Open a support ticket for the user'
  },
  /* {
    name: 'Save Chat',
    icon: <SaveIcon />,
    id: 'save_log',
    key: 8,
    hint: ' Save the chat log '
  },/ */
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
  send_email: sendEmailNode,

  sentiment_node: PRO_ChatSentimentNode,
  analyseSentiment_node: PRO_AnalyseSentimentNode,
  autorespond_node: PRO_AutoRespond,
  userstate_node: PRO_UserState,
  document_node: PRO_ArticleAnwser
};
