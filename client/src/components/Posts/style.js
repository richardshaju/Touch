import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  posts:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  parent:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center"  }
 
}));