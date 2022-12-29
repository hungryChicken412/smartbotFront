import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';
import Mail from '@mui/icons-material/Mail';

function SendEmailNode({ data }) {
  const [typeRef, qRef] = [
    useRef<HTMLSelectElement>(),
    useRef<HTMLInputElement>()
  ];
  const onChange = useCallback((_e) => {
    data['label'] = {
      to: qRef.current.value,
      message: typeRef.current.value
    };
    console.log(data['label']);
  }, []);

  const formRef = useRef<HTMLDivElement>();

  const [initialFormState, _setInitialFormState] = useState({
    to: data['label']['to'],
    message: data['label'['message']]
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
      <div className="node_icon operational_node">
        <Checkbox
          icon={<Mail />}
          id="edit_check"
          onClick={onEditMenu}
          checkedIcon={<Mail />}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: '#7686ff'
            }
          }}
        />
      </div>

      <div className="sm-node-form" ref={formRef}>
        <div className="sm-node-label"> Send Email </div>
        <div className="sm-node-form-step">
          <input
            type="text"
            placeholder=" To: test@email.com"
            className="sm-node-input"
            defaultValue={initialFormState.to}
            ref={qRef}
            onChange={onChange}
          ></input>
        </div>
        <div className="sm-node-form-step">
          <textarea
            id="outlined-textarea"
            className="sm-node-textarea"
            placeholder="Send This Message"
            rows={5}
            onChange={onChange}
            defaultValue={initialFormState.message}
          ></textarea>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default SendEmailNode;
