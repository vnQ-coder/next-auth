import TextField, { TextFieldProps } from "@mui/material/TextField";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      variant="standard"
      className={`!custom-text-field ${props.className}`}
      {...props}
    />
  );
};

export default CustomTextField;
