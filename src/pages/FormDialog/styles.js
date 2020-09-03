import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export const DialogStyled = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    min-width: 500px !important;
  }
`;

export const DialogContentStyled = styled(DialogContent)`
  display: flex;
  flex-direction: column;

  .MuiOutlinedInput-input {
    padding: 15px 14px;
  }

  .MuiFormControl-root {
    margin: 0 10px;
  }

  .marginLabelInput {
    margin: 0 5px;
  }

  .marginInput {
    margin: 0 5px 30px 5px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
`;
