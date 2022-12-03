import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useRef, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

function SendLinksNode({ data }) {
  const onChange = useCallback((evt) => {
    data['label'] = evt.target.value;
  }, []);

  const formRef = useRef<HTMLDivElement>();

  const [initialFormState, _setInitialFormState] = useState({
    link: data['label']
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
    <div className="sm-node ">
      <Handle type="target" position={Position.Top} className="entry_handle" />
      <div className="node_icon">
        <Checkbox
          icon={<AddLinkIcon />}
          id="edit_check"
          onClick={onEditMenu}
          checkedIcon={<AddLinkIcon />}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: '#7686ff'
            }
          }}
        />
      </div>

      <div className="sm-node-form" ref={formRef}>
        <div className="sm-node-label"> Send Link</div>
        <input
          id="text"
          name="text"
          placeholder=" Enter URL "
          defaultValue={initialFormState.link}
          onChange={onChange}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default SendLinksNode;
