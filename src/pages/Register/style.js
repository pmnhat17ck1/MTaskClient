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

  authWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    width: 486,
    top: '50%',
    left: '50%',
    padding: '90px 40px 20px',
    background: 'white',
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  textLogin: {
    paddingBottom: 0,
  },
  textEnterPassword: {
    color: Colors.Gray6,
  },
  img: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    marginTop: 30,
    height: 45,
    borderRadius: 50,
    boderWidth: 1,
    color: Colors.White,
  },
  inputControl: {
    display: 'block',
    with: '100%',
    marginBottom: 24,
    marginTop: 24,
  },
  wrapRememberMe: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    cursor: 'pointer',
  },
  forgotPassword: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    color: Colors.Gray7,
  },
  wrapSignUp: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 25,
  },
  textSignUp: {
    color: Colors.Secondary,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  col: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
