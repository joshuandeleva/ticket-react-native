import { defaultShortcuts, ShortcutProps } from "@/styles/shortcuts";
import { PropsWithChildren } from "react";
import { TextProps , Text as RNText } from "react-native";

interface CustomTextProps extends PropsWithChildren, TextProps ,ShortcutProps  {
    fontSize?: number;
    bold?: boolean;
    underline?: boolean;
    color?: string;
    children?: React.ReactNode;
}

export default function Text({fontSize = 10, bold, underline, color,children,...restProps}: CustomTextProps) {
    return (
        <RNText 
            style={[defaultShortcuts(restProps),{fontSize,fontWeight:bold ? "bold": "normal", color, textDecorationLine:underline ? 'underline':'none'}]}{...restProps}>{children}</RNText>
  )
}