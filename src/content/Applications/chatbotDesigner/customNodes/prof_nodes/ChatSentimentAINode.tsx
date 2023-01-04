import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';
import Badge from '@mui/material/Badge';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function PRO_ChatSentimentNode({ data }) {
  const [typeRef, _qRef] = [
    useRef<HTMLSelectElement>(),
    useRef<HTMLInputElement>()
  ];
  const onChange = useCallback((_e) => {
    data['label'] = {
      Type: typeRef.current.value
    };
    console.log(data['label']);
  }, []);

  const formRef = useRef<HTMLDivElement>();

  const [initialFormState, _setInitialFormState] = useState({
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
        <Badge badgeContent={'AI'} color="error">
          <Checkbox
            icon={<LibraryBooksIcon />}
            id="edit_check"
            onClick={onEditMenu}
            checkedIcon={<LibraryBooksIcon />}
            sx={{
              color: 'black',
              '&.Mui-checked': {
                color: '#7686ff'
              }
            }}
          />
        </Badge>
      </div>

      <div className="sm-node-form" ref={formRef}>
        <div className="sm-node-label"> Classify Sentiment</div>
        <div className="sm-node-form-step">
          <label className="sm-node-form-label"> Sentiment </label>
          <select
            id="text"
            onChange={onChange}
            ref={typeRef}
            name="text"
            defaultValue={initialFormState.type}
            placeholder="TYPE"
          >
            <option value="complaint">User Complaint</option>
            <option value="book_call">Book Appointment</option>

            <option value="recommend"> Other</option>
          </select>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default PRO_ChatSentimentNode;
