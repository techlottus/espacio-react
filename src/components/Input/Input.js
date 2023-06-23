import React, { useEffect } from 'react'

export const Input = React.memo(({data,value,hasError,errorMessage ,eventFocus,eventKeyPress, eventBlurPress, listenIcon})  => {
    const inputRef = React.createRef();

    useEffect(() => {
        inputRef.current.info = {
            label: data.label || '',
            name: data.name || '',
            type: data.type || '',
            typeButton: data.typeButton || '',
            maxlength: data.maxlength || '',
            onPaste: data.onPaste,
            placeholder: data.placeholder || '',
            autocomplete: data.autocomplete || '',
            disabled: data.disabled,
            alphanumeric: data.alphanumeric,
            alphabetical: data.alphabetical,
            onlyNumbers: data.onlyNumbers,
            upperCase: data.upperCase,
            pattern: data.pattern || '',
            mask: data.mask || ""
        }
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        inputRef.current.value = value;
    },[value]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        inputRef.current.hasError = hasError;
        inputRef.current.errorMessage = errorMessage;
    },[hasError,errorMessage]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {

        inputRef.current.addEventListener('eventFocus', eventFocus);
        inputRef.current.addEventListener('eventKeyPress', eventKeyPress);
        inputRef.current.addEventListener('eventBlurPress', eventBlurPress);
        inputRef.current.addEventListener('listenIcon', listenIcon);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
        <lottus-input ref={inputRef}></lottus-input>
        </>
    )
})