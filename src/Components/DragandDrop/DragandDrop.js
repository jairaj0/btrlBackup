import { useState , useEffect  } from "react";
import { FileUploader } from "react-drag-drop-files";
import swal from "sweetalert";
import { refreshToken, sendFileRequest } from "../../Helper/helper";
import styles from './DragandDrop.module.scss';

const fileTypes = ["JPEG","JPG", "PNG", "PDF"];



const DragandDrop = ({ type , name , status , img , getValue , formKey }) => {
    const [file, setFile] = useState(null);
    const [fileRes, setFileRes] = useState();
      const handleChange = (_file) => {
        setFile(_file);
      };

      useEffect(() => {
        img && setFileRes({data: img})
      }, [img])
      

      useEffect(() => {
        if(file){
          (async()=>{
            const res = await sendFileRequest({file : file[0] , type : type , name : name} , "upload-document");
            if(res.status===200){
              setFileRes(res)
              getValue(formKey , res.data)
            }else{
              swal(res.message)
              setFile(null)
            }
            refreshToken(res.refresh_token)
          })()
        }
      }, [file])


      return (
        <div className={styles.dandd}>
          {status && <FileUploader
            multiple={true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />}
          {fileRes && <img src={fileRes.data} alt="file" />}
          {!fileRes && <p>Drag and drop file here<br/><span>(or click to select file)</span></p>}
          {fileRes && status && <p className={status ? styles.onHover : ""}>Drag and drop file here for change<br/><span>(or click to select file)</span></p>}
        </div>
      );
}

export default DragandDrop