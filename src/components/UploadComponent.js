import {useDropzone} from "react-dropzone";
import {Button} from "@mui/material";

export default function UploadComponent(props) {
  const { setFieldValue } = props;
  const { getRootProps, getInputProps, isDragActive, open, acceptedFiles } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFieldValue("files", acceptedFiles);
    }
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));


  return (
    <div className="">
      <div {...getRootProps({className: 'dropzone flex items-center flex-col border-2 p-4 border-dashed rounded-lg'})}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <Button variant={'contained'} className="bg-[#2065D1] my-3" type="button" onClick={open}>
          Open File Dialog
        </Button>
      </div>
      <aside className="py-4">
        <ul>{files}</ul>
      </aside>
    </div>
  );
};
