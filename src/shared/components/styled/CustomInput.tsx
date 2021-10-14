import { TextField, withStyles } from '@material-ui/core';
import { Colors } from '../../styles/colors';

export const CustomInput = withStyles({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: Colors.white,
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: Colors.white,

      '&:hover fieldset': {
        borderColor: Colors.strongRed,
      },
      '&.Mui-focused fieldset': {
        borderColor: Colors.strongRed,
      },
    },
  },
})(TextField);
