import useStyles from './styles'
import { Paper,Typography,TextField,Button } from '@mui/material'
import FileBase from 'react-file-base64'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost,getPosts, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'

const  Form = ({user,currentId,setCurrentId})=> {
    const dispatch = useDispatch()
    const classes = useStyles()
    const currentPost= useSelector((state)=> currentId? state.posts.find(post=> post._id===currentId)
                                                    : null)

    // console.log(state, ' is state from Form component')
    // console.log(currentId, ' is currentpost ID from Form component')
    // console.log(currentPost, ' is currentPost from Form component')
    const [postData,setPostData] = useState({
        title:'',
        message:'',
        tags:'',
        likes:[],
        selectedFile:null,

    })
    console.log(postData,' is postData in current form')
    const handleSubmit = async (e)=>{
        e.preventDefault()

        if(currentId){
        await dispatch(updatePost(currentId,postData))
        }
        else
        dispatch(createPost({...postData,creator:user.id}))
        clear()
    }
    const clear =()=>{setPostData({

        title:'',
        message:'',
        tags:''
        })
        setCurrentId(0)
    }

    useEffect(()=>{if(currentPost) setPostData(currentPost)},[currentId,currentPost])
    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>
                    {`${currentPost?'Updating':"Creating a"} memory`}
                </Typography>
                {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value, })} />
                <Typography variant="contained" fullWidth >{postData.creator+'is creator'} </Typography>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} multiline rows={4} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>



            </form>
        </Paper>
    )
}
export default Form
