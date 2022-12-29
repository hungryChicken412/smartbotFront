import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';
import Badge from '@mui/material/Badge';
import ContactPageIcon from '@mui/icons-material/ContactPage';

function PRO_UserState({ data }) {
  const [typeRef, qRef] = [
    useRef<HTMLSelectElement>(),
    useRef<HTMLSelectElement>()
  ];
  const onChange = useCallback((_e) => {
    data['label'] = {
      Question: typeRef.current.value,
      Value: qRef.current.value
    };
    console.log(data['label']);
  }, []);

  const formRef = useRef<HTMLDivElement>();

  const [initialFormState, _setInitialFormState] = useState({
    Question: data['label'['Question']],
    Value: data['label'['Value']]
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
            icon={<ContactPageIcon />}
            id="edit_check"
            onClick={onEditMenu}
            checkedIcon={<ContactPageIcon />}
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
        <div className="sm-node-label"> User State</div>
        <div className="sm-node-form-step">
          <select
            id="text"
            onChange={onChange}
            ref={typeRef}
            name="text"
            defaultValue={initialFormState.Question}
            placeholder="TYPE"
          >
            <option value="returning"> Is Returning? </option>
            <option value="registered"> Has Registered? </option>
            <option value="cart_empty"> Empty Cart? </option>
            <option value="cart_left"> Abandoned Cart?</option>
          </select>
        </div>
        <div className="sm-node-form-step">
          <label className="sm-node-form-label"> Value </label>
          <select
            id="text"
            onChange={onChange}
            ref={qRef}
            name="text"
            defaultValue={initialFormState.Value}
            placeholder="TYPE"
          >
            <option value="true"> True </option>
            <option value="false"> False </option>
          </select>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default PRO_UserState;
