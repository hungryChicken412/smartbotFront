import { ChatBubble } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useRef, useState } from 'react';
function UserMessageNode({ data }) {
  const onChange = useCallback((evt) => {
    data['label'] = evt.target.value;
  }, []);

  const formRef = useRef<HTMLDivElement>();
  const [initialFormState, _setInitialFormState] = useState({
    userMessage: data['label']
  });
  const onEditMenu = useCallback((evt) => {
    var checked = evt.target.checked;
    var menu = formRef.current;

    if (checked) {
      console.log();
      menu.classList.toggle('node-active');
    } else {
      menu.classList.toggle('node-active');
    }
  }, []);

  return (
    <div className="sm-node user-node">
      <Handle type="target" position={Position.Top} className="entry_handle" />
      <div className="node_icon">
        <Checkbox
          icon={<ChatBubble />}
          id="edit_check"
          onClick={onEditMenu}
          checkedIcon={<ChatBubble />}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: '#7686ff'
            }
          }}
        />
      </div>

      <div className="sm-node-form" ref={formRef}>
        <div className="sm-node-label"> User Message Option</div>
        <textarea
          id="outlined-textarea"
          placeholder="User Message Option"
          defaultValue={initialFormState.userMessage}
          onChange={onChange}
        ></textarea>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default UserMessageNode;
