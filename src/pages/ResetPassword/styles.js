import Colors from '../../configs/Colors';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: "linear-gradient(to right, #ACB6E5, #74ebd5)",
    height:'100%',
    width: '100%',
  },
  col: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBack: {
    fontSize: 16,
    marginLeft: 17,
  },
  bodyWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    width: 486,
    top: '50%',
    left: '50%',
    padding: '16px 40px 120px',
    background: 'white',
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  forgotPassword: {
    width: 405,
  },
  button: {
    width: '100%',
    marginTop: 30,
    height: 45,
    borderRadius: 50,
    boderWidth: 1,
    color: Colors.White,
  },
  inputLabel: {
    marginTop: 20,
    marginBottom: 5,
    color: Colors.Gray23,
    fontWeight: 500,
  },
  logoLock: {
    marginBottom: 11,
  },
};
