import { Handle, Position } from 'reactflow';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function ExitNode() {
  return (
    <div className="sm-node exit-node">
      <Handle type="target" position={Position.Top} className="entry_handle" />
      <div className="node_icon">
        <ExitToAppIcon />
      </div>
      <div className="sm-node-label"> Exit</div>
    </div>
  );
}

export default ExitNode;
