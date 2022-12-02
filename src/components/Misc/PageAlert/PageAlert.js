import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { AppContext } from '../../../context/AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    position: "fixed",
    bottom: "20px",
    zIndex: 1,
    right: "50%",
    transform: "translate(50%,-50%)"
  },
}));

export default function PageAlert() {
  const classes = useStyles();
  const { alertState } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const [alert, setAlert] = alertState;

  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
    if (!alert) {
      setOpen(false);
    }
    setTimeout(() => {
      setOpen(false);
      setShown(true);
    }, 5000);
  }, [alert, setAlert]);

  useEffect(() => {
    if(shown) {
      setAlert(null);
    }
  }, [shown, setAlert]);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={alert?.type}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alert?.message}
        </Alert>
      </Collapse>
    </div>
  );
}