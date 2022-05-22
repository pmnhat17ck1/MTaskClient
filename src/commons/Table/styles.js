import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../configs/Colors';

export default makeStyles(() => ({
  table: {
    width: '100%',
  },
  tfoot: {},
  thead: {},
  tbody: {},
  tr: {
    borderBottomWidth: '1px',
    borderBottomColor: Colors.Gray4,
    borderBottomStyle: 'solid',
  },
  th: {
    backgroundColor: Colors.Gray2,
    padding: '12px 8px',
  },
  td: {
    padding: '12px 8px',
    color: Colors.Gray8,
  },
}));
