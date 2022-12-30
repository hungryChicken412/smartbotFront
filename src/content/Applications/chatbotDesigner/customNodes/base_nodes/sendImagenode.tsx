import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import ImageIcon from '@mui/icons-material/Image';
import Checkbox from '@mui/material/Checkbox';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';

import toast from 'src/components/Toast';

function SendImageNode({ data }) {
  const formRef = useRef<HTMLDivElement>();
  const imageRef = useRef<HTMLDivElement>();
  const imageURL = useRef<HTMLInputElement>();
  const [initialFormState, _setInitialFormState] = useState({
    imageLink: data['label']
  });
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const onChange = useCallback((_evt) => {
    try {
      imageRef.current.style.backgroundImage =
        'url(' + imageURL.current.value + ')';
      imageRef.current.style.height = '100px';
      data['label'] = imageURL.current.value;
    } catch {
      notify('error', ' Please Enter A Valid URL');
    }
  }, []);
  const onEditMenu = useCallback((evt) => {
    var checked = evt.target.checked;
    var menu = formRef.current;
    if (checked) {
      console.log();
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
          icon={<ImageIcon />}
          id="edit_check"
          onClick={onEditMenu}
          checkedIcon={<ImageIcon />}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: '#7686ff'
            }
          }}
        />
      </div>

      <div className="pt-6 sm-node-form" ref={formRef}>
        <div className="sm-node-label"> Send Image </div>

        <div ref={imageRef} className="sm-node-image-preview"></div>

        <div className="sm-node-image-input">
          <input
            id="sm-node-image"
            ref={imageURL}
            placeholder="Enter Image Link"
            defaultValue={initialFormState.imageLink}
            type="url"
          />
          <Button variant="contained" onClick={onChange} size="small">
            Go
          </Button>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default SendImageNode;
