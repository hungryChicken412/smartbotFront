import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import EmailIcon from '@mui/icons-material/Email';
import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';

function MessageNode({ data }) {
  const formRef = useRef<HTMLDivElement>();

  const onChange = useCallback((evt) => {
    data['label'] = evt.target.value;
  }, []);

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
  const [initialFormState, _setInitialFormState] = useState({
    message: data['label']
  });

  return (
    <div className="sm-node">
      <Handle type="target" position={Position.Top} className="entry_handle" />
      <div className="node_icon">
        <Checkbox
          icon={<EmailIcon />}
          id="edit_check"
          onClick={onEditMenu}
          checkedIcon={<EmailIcon />}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: '#7686ff'
            }
          }}
        />
      </div>

      <div className="pt-6 sm-node-form" ref={formRef}>
        <div className="sm-node-label"> Send User Message </div>
        <textarea
          id="outlined-textarea"
          className="sm-node-textarea"
          placeholder="Send User This Message"
          rows={5}
          onChange={onChange}
          defaultValue={initialFormState.message}
        ></textarea>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default MessageNode;
