import { Card } from '@mui/material';

import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders({ bots }) {
  return (
    <Card>
      <RecentOrdersTable cryptoOrders={bots} />
    </Card>
  );
}

export default RecentOrders;
