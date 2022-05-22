import React from 'react';
import useStyles from './styles';

const Table = ({ children, id }) => {
  const classes = useStyles();
  return (
    <table className={classes.table} id={id}>
      {children}
    </table>
  );
};

const Thead = ({ children }) => {
  const classes = useStyles();
  return <thead className={classes.thead}>{children}</thead>;
};

const Tbody = ({ children, style }) => {
  const classes = useStyles();
  return (
    <tbody style={style} className={classes.tbody}>
      {children}
    </tbody>
  );
};

const Tfoot = ({ children }) => {
  const classes = useStyles();
  return <tfoot className={classes.tfoot}>{children}</tfoot>;
};

const Tr = ({ children, className, onClick }) => {
  const classes = useStyles();
  return (
    <tr className={className || classes.tr} onClick={onClick}>
      {children}
    </tr>
  );
};

const Th = ({ children, className }) => {
  const classes = useStyles();
  return <th className={className || classes.th}>{children}</th>;
};

const Td = ({ children, className }) => {
  const classes = useStyles();
  return <td className={className || classes.td}>{children}</td>;
};

export { Table, Thead, Tbody, Tfoot, Tr, Th, Td };
