import Colors from '../../configs/Colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  wrapper: {
    height: '100%',
    top: 50,
    left: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    marginRight: '6px',
    overflowX: 'hidden',
    zIndex: 10,
    paddingLeft: 16,
    background: "#FAFBFC",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    width: 270,
  },
  sideBar: {
    display: "flex",
    flexDirection: 'column',
    paddingTop : 80,
    width: "100%",
    height: "100%",
    paddingRight : 12,
    overflow: 'auto'
  },
  groupRow:{
    display: 'flex',
    flexDirection: 'column',
  },
  active:{
    background: Colors.Blue4
  },
  deleteGroup: {
    flex:1,
    width: 'auto',
    marginTop: 16,
    background: Colors.Red5,
    height: 50,
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
  createGroup: {
    flex:1,
    height: 50,
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    marginBottom: 16,
  },
  currentGroup: { display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 16,  boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", },
  imgCurrentGroup: {  width: 50, height: 50, marginRight: 16, borderRadius: 5 },
  contentCurrentGroup: { display: 'flex', alignItems: 'center', flexDirection: 'column', flex: 1,  borderRadius: 5, overflow: 'hidden' },
  textCurrentGroup:{  width: 70, height: 25,  display: 'flex', justifyContent: 'flex-start', textOverflow: 'ellipsis', whiteSpace: 'noWrap'},
  buttonEdit: {
    marginLeft:6,
    width: 45, height: 45, background: Colors.Blue3,
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
}));
export const styles = {
  active: {
    color: Colors.Primary,
    display: 'flex',
    padding: '6px',
  },
  datePicker: {
    width: '100%',
    color: Colors.Black,
  },
  task: {
     display: 'flex', flexDirection: 'column', width: 370,marginLeft:6, marginRight:6,  boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", height: 700, padding: 12
  },
  createTask:{
     width: 250, paddingTop: 8, paddingBottom: 8, background: "#2684FF", boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px", 
  },
  card:{
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    marginBottom: 16,
    padding:6,
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  }
};
