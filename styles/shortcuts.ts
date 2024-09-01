import { DimensionValue } from "react-native"

export interface ShortcutProps {
    m?: number | "auto"
    mt?: number | "auto"
    mr?: number | "auto"
    mb?: number | "auto"
    ml?: number | "auto"
    mx?: number | "auto"
    my?: number | "auto"
    p?: number
    pt?: number
    pr?: number
    pb?: number
    pl?: number
    px?: number
    py?: number

    w?: DimensionValue
    h?: DimensionValue
}

export const defaultShortcuts = (props:ShortcutProps) => ({
    margin: props.m,
    marginTop: props.mt,
    marginRight: props.mr,
    marginBottom: props.mb,
    marginLeft: props.ml,
    marginHorizontal: props.mx,
    marginVertical: props.my,

    padding: props.p,
    paddingTop: props.pt,
    paddingRight: props.pr,
    paddingBottom: props.pb,
    paddingLeft: props.pl,
    paddingHorizontal: props.px,
    paddingVertical: props.py,
    
    width: props.w,
    height: props.h,
})