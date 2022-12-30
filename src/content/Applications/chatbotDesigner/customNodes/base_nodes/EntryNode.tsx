import { Handle, Position } from 'reactflow';
import StartIcon from '@mui/icons-material/Start';

function EntryNode() {
  return (
    <div className="sm-node entry-node">
      <div className="node_icon">
        <StartIcon />
      </div>
      <div className="sm-node-label"> Entry</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="entry_handle"
      />
    </div>
  );
}

export default EntryNode;
