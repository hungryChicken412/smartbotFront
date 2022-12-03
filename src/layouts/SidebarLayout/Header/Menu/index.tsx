import Label from '@/components/Label';
import Typography from '@mui/material/Typography';

function HeaderMenu() {
  return (
    <>
      <Typography
        sx={{
          mb: 1
        }}
        variant="subtitle1"
      >
        <Label color="success">
          <b>TIP</b>
        </Label>
        <b style={{ marginLeft: 14 }}>
          {' '}
          Always Make Sure To Keep Your Users Engaged
        </b>
      </Typography>
    </>
  );
}

export default HeaderMenu;
