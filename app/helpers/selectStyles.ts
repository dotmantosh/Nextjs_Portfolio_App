export const customStyle = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    minHeight: "38px",
    borderRadius: "5px"
    // borderColor: state.isFocused ? 'grey' : 'red',
  }),

  menu: (baseStyles: any) => ({
    ...baseStyles,
    color: "#000"
  })
}