import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Actions from './Actions';
import moment from "moment";
import { AuthContext } from '../App';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';

const Cardcont=styled(CardContent)`
cursor:pointer;
`;
const Cardimg=styled(CardMedia)`
cursor:pointer;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function PostCard(props) {
  
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    
    const {user, _id, title, content, image, createdOn} = props.post;
    const {auth} = React.useContext(AuthContext) 
  return (
    <>
    {auth._id===user._id && <>
    <Card sx={{ width: "100%", boxShadow: "0 0 15px rgb(0, 0, 0, 0.2)", borderRadius: "4px", height:"auto"}} id={_id}
    >
      
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name.slice(0,1)}
          </Avatar>
        }
        action={
          auth._id === user._id && <Actions id={_id} userid={user._id}/>
        }
        title={user.name}
        
        subheader={moment(createdOn).fromNow()}
      />
      <hr/>
      <Typography sx={{marginLeft:"10%",color:"black",fontFamily:"sans-serif",fontWeight:500,padding:"1%"}} onClick={handleClickOpen}>{title.toUpperCase()}</Typography>
      
      <Cardimg onClick={handleClickOpen}
        component="img"
        height="100%"
        image={image}
        alt='blog image'
        style={{maxHeight:"400px"}}
      />
      
      <Cardcont cursor="pointer" onClick={handleClickOpen}>
        <Typography variant="body2" color="text.secondary" style={{whiteSpace:"pre-wrap"}}
        sx={{display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 5,}}>
          {content}
        </Typography>
      </Cardcont>
    </Card>
    <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
            </Typography>
            <Typography sx={{ ml: 2, flex: 1, fontStyle: 'italic',fontSize:'0.8rem' }} component="div">
            By- {user.name}
            </Typography>

            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <img src={image} alt={user} style={{height:"30rem",width:"30rem",marginTop:"2%",marginBottom:"0.5%",maxWidth:"50%",maxHeight:"50%"}}></img>
          <p style={{padding:"2rem",whiteSpace:"pre-wrap"}}>{content}</p>
          </div>
        {/* <CardMedia
        component="img"
        image={image}
        alt={user}
      /> */}  
      </Dialog>
    </>
    }
    </>
  );
}