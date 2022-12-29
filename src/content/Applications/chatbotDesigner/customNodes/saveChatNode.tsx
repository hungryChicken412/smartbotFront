import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import SaveIcon from '@mui/icons-material/Save';
import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';

function SaveChatNode({ data }) {
  const formRef = useRef<HTMLDivElement>();

  const onEditMenu = useCallback((evt) => {
    var checked = evt.target.checked;
    var menu = formRef.current;
    if (checked) {
      console.log(data);
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
          icon={<SaveIcon />}
          id="edit_check"
          onClick={onEditMenu}
          checkedIcon={<SaveIcon />}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: '#7686ff'
            }
          }}
        />
      </div>

      <div className="pt-6 sm-node-form" ref={formRef}>
        <div className="sm-node-label"> Save Chat Log </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default SaveChatNode;
