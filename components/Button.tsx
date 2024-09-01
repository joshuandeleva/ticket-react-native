import { defaultShortcuts, ShortcutProps } from "@/styles/shortcuts";
import { ActivityIndicator, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityProps } from "react-native"
import Text from "./Text";


interface ButtonProps extends ShortcutProps, TouchableOpacityProps {
    onPress?: () => void;
    children?: React.ReactNode;
    variant?: "contained" | "outlined" | "ghost";
    isLoading?: boolean;
}

const CustomButton = ({onPress ,children, variant = "contained" , isLoading , ...restProps}:ButtonProps) => {
    return (
        <TouchableOpacity disabled={isLoading} onPress={onPress} style={[defaultShortcuts(restProps) , styles[variant].button ,isLoading && disabled.button]}>
           {isLoading ? <ActivityIndicator animating size={22} /> : <Text style={styles[variant].text}>{children}</Text>}
        </TouchableOpacity>
    )

}

export default CustomButton


const styles = {
   contained:StyleSheet.create({
        button :{
            padding:14,
            backgroundColor:"black",
            borderRadius:50,
        },
        text:{
            color:"white",
            textAlign:"center",
            fontSize:18,
        },
   }),
   outlined:StyleSheet.create({
        button :{
            padding:14,
            borderRadius:50,
            borderColor:'darkgray',
            borderWidth:1,
        },
        text:{
            color:"black",
            textAlign:"center",
            fontSize:18,
        },
   }),
   ghost:StyleSheet.create({
        button :{
            padding:14,
            backgroundColor:"transparent",
            borderRadius:50,
        },
        text:{
            color:"black",
            textAlign:"center",
            fontSize:18,
        },
   })
}

const disabled  = StyleSheet.create({
    button :{
        opacity:0.5
    }
})
