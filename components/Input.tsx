import { defaultShortcuts, ShortcutProps } from "@/styles/shortcuts";
import { PropsWithChildren } from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps ,PropsWithChildren , ShortcutProps {}

const CustomInput = (props:InputProps) =>{
    return (
        <TextInput style={[defaultShortcuts(props),{fontSize:16 , borderRadius:16 ,color:"black" , backgroundColor:"lightgray"}]} {...props}/>
    )
}

export default CustomInput;