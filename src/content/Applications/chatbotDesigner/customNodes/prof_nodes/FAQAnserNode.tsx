import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';
import Badge from '@mui/material/Badge';
import AssignmentIcon from '@mui/icons-material/Assignment';

function PRO_FAQAnswer({ data }) {


  const formRef = useRef<HTMLDivElement>();

  const [_initialFormState, _setInitialFormState] = useState({
    type: data['label'['article']]
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
            icon={<AssignmentIcon />}
            id="edit_check"
            onClick={onEditMenu}
            checkedIcon={<AssignmentIcon />}
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
        <div className="sm-node-label"> Answer From FAQs</div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default PRO_FAQAnswer;
