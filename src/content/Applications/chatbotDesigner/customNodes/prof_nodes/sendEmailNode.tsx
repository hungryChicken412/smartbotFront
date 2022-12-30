import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';
import Mail from '@mui/icons-material/Mail';

function SendEmailNode({ data }) {
  const [toRef, qRef, subRef] = [
    useRef<HTMLInputElement>(),
    useRef<HTMLTextAreaElement>(),
    useRef<HTMLInputElement>()
  ];
  const onChange = useCallback((_e) => {
    data['label'] = {
      to: toRef.current.value,
      message: qRef.current.value,
      subject: subRef.current.value
    };
    console.log(data['label']);
  }, []);

  const formRef = useRef<HTMLDivElement>();

  const [initialFormState, _setInitialFormState] = useState({
    to: data['label']['to'],
    message: data['label']['message'],
    subject: data['label']['subject']
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
            ref={toRef}
            onChange={onChange}
          ></input>
        </div>
        <div className="sm-node-form-step">
          <input
            type="text"
            placeholder=" Subject "
            className="sm-node-input"
            defaultValue={initialFormState.subject}
            ref={subRef}
            onChange={onChange}
          ></input>
        </div>
        <div className="sm-node-form-step">
          <textarea
            id="outlined-textarea"
            className="sm-node-textarea"
            placeholder=" Message Body "
            rows={5}
            onChange={onChange}
            ref={qRef}
            defaultValue={initialFormState.message}
          ></textarea>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default SendEmailNode;
