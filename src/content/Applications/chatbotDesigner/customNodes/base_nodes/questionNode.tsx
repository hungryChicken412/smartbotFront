import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';
import HelpIcon from '@mui/icons-material/Help';

function AskQuestionNode({ data }) {
  const [typeRef, qRef] = [
    useRef<HTMLSelectElement>(),
    useRef<HTMLInputElement>()
  ];
  const onChange = useCallback((_e) => {
    data['label'] = {
      Question: qRef.current.value,
      Type: typeRef.current.value
    };
    console.log(data['label']);
  }, []);

  const formRef = useRef<HTMLDivElement>();

  const [initialFormState, _setInitialFormState] = useState({
    question: data['label']['Question'],
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
      <div className="node_icon">
        <Checkbox
          icon={<HelpIcon />}
          id="edit_check"
          onClick={onEditMenu}
          checkedIcon={<HelpIcon />}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: '#7686ff'
            }
          }}
        />
      </div>

      <div className="sm-node-form" ref={formRef}>
        <div className="sm-node-label"> Ask Question </div>
        <div className="sm-node-form-step">
          <input
            type="text"
            placeholder=" Your Question"
            className="sm-node-input"
            defaultValue={initialFormState.question}
            ref={qRef}
            onChange={onChange}
          ></input>
        </div>
        <div className="sm-node-form-step">
          <label className="sm-node-form-label"> TYPE</label>
          <select
            id="text"
            onChange={onChange}
            ref={typeRef}
            name="text"
            defaultValue={initialFormState.type}
            placeholder="TYPE"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email"> Email</option>
            <option value="address">Address</option>
          </select>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default AskQuestionNode;
