import Colors from '../../configs/Colors';
import { GrayUnderlineStyle } from '../../configs/Styles';

const flexRowCenter = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'rows',
};
const flexNoWrap = {
  display: 'flex',
  flexWrap: 'nowrap',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  header: {
    width: '100%',
    height: 56,
    position: 'fixed',
    top: 0,
    zIndex: 1001,
    backgroundColor: Colors.White,
    ...GrayUnderlineStyle,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
  divider: {
    margin: 0,
    padding: 0,
  },
  textColorGreen: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#2684FF",
  },
  textColorGray: {
    marginLeft: 10,
    marginTop: 3,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.Gray23,
  },
  imageProfile: {
    height: 35,
    width: 35,
    marginLeft: 35,
    marginRight: 35,
    cursor: 'pointer',
    backgroundColor: Colors.White,
    borderRadius: 50,
    boderWidth: 1,
    borderColor: Colors.Gray5,
  },
  textDarkMode: {
    fontSize: 14,
    marginLeft: 17,
    whiteSpace: 'nowrap',
  },
  iconSwitch: {
    marginLeft: 15,
  },
  menu: {
    marginTop: 4,
    marginRight: 40,
    borderColor: Colors.White,
  },
  overlay: {
    width: 150,
  },
  textProfile: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 8,
  },
  textSignOut: {
    fontSize: 16,
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 8,
  },
  headerRight: {
    ...flexRowCenter,
  },
  headerLeft: {
    ...flexRowCenter,
  },
  headerCenter:{
    ...flexRowCenter,
    height:40, width:'auto'
  },
  buttonDisable:{
    marginLeft: 16,
    backgroundColor: Colors.Red5,
  },
  headerIcon: {
    marginLeft: 26,
  },
  flexNoWrap: {
    ...flexNoWrap,
  },
  subMenu: {
    backgroundColor: Colors.White,
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    padding: 6,
    cursor: 'pointer'
  }
};
