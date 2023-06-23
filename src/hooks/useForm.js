import { useEffect, useState } from "react"
import { FormBuilder } from "react-reactive-form"


export const useFormBuilder = (bodyBtn,actionValid=() => {}) => {
  const [form,setForm] = useState({
    ref: FormBuilder.group({})
  })

  const [next, setNext] = useState({
    valid: false,
    value: null,
  });

  const [errors,setErrors] = useState({})

  const [nextBtn, setNextBtn] = useState({
    ...bodyBtn,
    disabled: true,
    isExpand: window.innerWidth < 991,
  });

  const handleForm = (info) => {
    setForm({
      ref: FormBuilder.group(info)
    })
  }

  useEffect(() => {
    setNext((state) => {
      return {
        ...state,
        value: form.ref.value,
      };
    });
    setNextBtn((state) => {
      return {
        ...state,
        disabled: !form.ref.valid,
      };
    });
    form.ref.valueChanges.subscribe((res) => {
      setNext((state) => {
        return {
          ...state,
          value: res,
        };
      });

      setNextBtn((state) => {
        return {
          ...state,
          disabled: !form.ref.valid,
        };
      });

      let errorsForms = {};
      Object.keys(res).forEach((item) => {
        const error = form.ref.get(item).errors;
        errorsForms = {
          ...errorsForms,
          [item]: error !== null && res[item] && res[item].length > 0
        }
      })
      setErrors(errorsForms);
    });

    return () => {
      //obs.unsubscribe();
    };
  }, [form.ref]);

  useEffect(() => {
    if (next.valid) {
      actionValid();
      setNext({
        valid: false,
        values: null
      })
    }
  }, [next]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNextBtn = (disabled) => {
    setNextBtn((state) => {
      return {
        ...state,
        disabled,
      };
    });
  }

  const handleNext = (valid) => {
    setNext((state) => {
      return {
        ...state,
        valid,
      };
    });
  }
  return {
    form: form.ref,
    setForm:handleForm,
    next,
    setNext:handleNext,
    nextBtn,
    setNextBtn: handleNextBtn,
    errorForms: errors
  };
}