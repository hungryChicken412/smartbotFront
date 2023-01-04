import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';
import ChatBubble from '@mui/icons-material/ChatBubbleOutline';

function PRO_customInput({ data }) {
  const formRef = useRef<HTMLDivElement>();

  const [_initialFormState, _setInitialFormState] = useState({
    type: data['label'['type']]
  });
  const onEditMenu = useCallback((evt) => {
    var checked = evt.target.checked;
    var menu = formRef.current;

    if (checked) {
      menu.classList.toggle('node-active');
    } else {
      menu.classList.toggle('node-active');
    }
  }, []);

  return (
    <div className="sm-node">
      <Handle type="target" position={Position.Top} className="entry_handle" />
      <div className="node_icon  Pro_node  ">
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
        <div className="sm-node-label"> Custom Input</div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default PRO_customInput;
