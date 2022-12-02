import React, {Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import './styles/DialogPopup.css';
import { Button } from '@material-ui/core';

export default function DialogPopup({open, setOpen, title, content, actions}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className="dialog"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent className="dialog__content" style={!fullScreen ? {width: "500px"}:null}>
          {content}
        </DialogContent>
        <DialogActions>
          {fullScreen ? 
          <Button onClick={handleClose}>
            Cancel
          </Button>
          :null}
          {actions}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}