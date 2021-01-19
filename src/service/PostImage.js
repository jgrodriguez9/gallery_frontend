import httpInstance from "./ApiConfig";


function PostImage(props){
    const data = props.data
    let config = {}

    config = {
        headers: { 
            "Authorization": `Bearer ${props.access_token}`,
            "Accept": "application/json",
            "Content-Type": "multipart/form-data"
        }
    };
   

    
    return httpInstance.post(props.url, data, config)
}
export default PostImage