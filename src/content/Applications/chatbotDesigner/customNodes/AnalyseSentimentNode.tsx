import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import Checkbox from '@mui/material/Checkbox';
import { useRef } from 'react';
import Badge from '@mui/material/Badge';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function PRO_AnalyseSentimentNode({ data }) {
  const [typeRef, qRef] = [
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
        <Badge badgeContent={'AI'} color="error">
          <Checkbox
            icon={<AutoGraphIcon />}
            id="edit_check"
            onClick={onEditMenu}
            checkedIcon={<AutoGraphIcon />}
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
        <div className="sm-node-label"> Analyze Sentiment</div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default PRO_AnalyseSentimentNode;
