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
  },
  divider: {
    margin: 0,
    padding: 0,
  },
  textColorGreen: {
    marginLeft: 10,
    marginTop: 3,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.Green7,
  },
  textColorGray: {
    marginLeft: 10,
    marginTop: 3,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.Gray23,
  },
  imageProfile: {
    height: 45,
    width: 45,
    marginLeft: 40,
    marginRight: 40,
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
    marginBottom: 8,
  },
  textSignOut: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  headerRight: {
    ...flexRowCenter,
  },
  headerLeft: {
    ...flexRowCenter,
  },
  headerIcon: {
    marginLeft: 26,
  },
  flexNoWrap: {
    ...flexNoWrap,
  },
};
