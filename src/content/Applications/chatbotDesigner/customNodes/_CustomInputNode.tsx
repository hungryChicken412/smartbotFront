import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';

function GetCustomInputNode({ data }) {
  const onChange = useCallback((evt) => {
    data['label'] = evt.target.value;
  }, []);

  const formRef = useRef<HTMLDivElement>();

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
          icon={<KeyboardIcon />}
          id="edit_check"
          onClick={onEditMenu}
          checkedIcon={<KeyboardIcon />}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: '#7686ff'
            }
          }}
        />
      </div>

      <div className="sm-node-form" ref={formRef}>
        <div className="sm-node-label"> Custom User Input </div>
        <div className="sm-node-form-step">
          <label className="sm-node-form-label"> TYPE</label>
          <select id="text" name="text" placeholder="" onChange={onChange}>
            <option value="text">Text</option>
            <option value="phone">Number</option>
            <option value="email">Password</option>
            <option value="address">Address</option>
          </select>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default GetCustomInputNode;
