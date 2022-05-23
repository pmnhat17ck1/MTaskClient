import Colors from '../../configs/Colors';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  body: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  header: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  superUser: {
    width: 130,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    color: Colors.Primary,
    backgroundColor: Colors.Gray4,
    padding: 6,
    borderRadius: 5,
  },
  changePassword: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 14,
    color: Colors.Primary,
    padding: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  subName: {
    fontWeight: 'bold',
    color: Colors.Gray23,
    marginBottom: 5,
  },
  imageLock: {
    marginRight: 10,
    marginBottom: 3,
  },
  input: {
    borderRadius: 5,
  },
  widthBody: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    paddingTop:120,
    width: '50%',
    margin: 'auto'
  },
  profileItem: {
    display:"flex",
    flexDirection: 'column',
    width: '100%',
    marginTop: 30,
  },
  buttonSave: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  button: {
    borderRadius: 10,
    height: 40,
    width: 100,
    backgroundColor: Colors.Primary,
    color: Colors.Gray4,
  },
  datePicker: {
    width: '100%',
    color: Colors.Black,
  },
  wrapUploadImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
