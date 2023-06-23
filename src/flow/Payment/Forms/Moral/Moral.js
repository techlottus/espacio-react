import React, { useEffect, useState } from "react";
import { inputsMoralTax, typesInputs } from '../../../../constants/Payment.constant';
import { Input } from '../../../../components/Input/Input';
import {
  FormBuilder,
  Validators
} from 'react-reactive-form';
import { Select } from "../../../../components/Select/Select";
import { useSelector } from "react-redux";
import { zipObs } from "../../../../observables/zipObservable";
import { getZipService } from "../../../../middlewares/paymentMiddleware";
import { useDispatch } from "react-redux";

const Moral = ({onSave}) => {
  const { texts } = useSelector(state => state.texts);
  const { taxRegime } = useSelector((state) => state.payment);
  const dispatch = useDispatch()
  const editForm = useSelector(state => state.payment.editForm)
  let moralForm;

  const [listInputs, setListInputs] =useState([...inputsMoralTax]);

  useEffect(() => {
    setListInputs((state) => {
      return state.map((item) => {
        if (item.name === "regime" && moralForm?.value?.cfdi) {
          switch (moralForm?.value?.cfdi) {
            case "D10":
              return {
                ...item,
                options: taxRegime?.D10,
              };
            case "G03":
              return {
                ...item,
                options: taxRegime?.G03,
              };
            case "P01":
              return {
                ...item,
                options: taxRegime?.P01,
              };
            default:
              return {
                ...item,
                options: [],
              };
          }
        }
      });
    });
  }, [taxRegime, moralForm?.value?.cfdi]);

  const handleErrorsInput = (name) => {
    const error = moralForm.get(name).errors;
    setListInputs((state) => {
      return state.map((input) => {
      if(input.typeCmp === typesInputs.input) {
        return {
          ...input,
          hasError: (input.data.name === name && error !== null) ? true : false
        }
      }
      else {
        return {
          ...input,
        }
      }
    })});
    
  }

  const initialValues = () => {
    const list = listInputs.map((input) => {
      switch(input.typeCmp) {
        case typesInputs.select:
          return { 
            ...input,
            data: {
              ...input.data,
              textDefault: texts?.payment.forms[input.name]?.title
            },
            options: input.options ? input.options.map((option) => {
              return {
                ...option,
                active: option.value === moralForm.get(input.name)?.value,
              };
            }) : [],
          };
        case typesInputs.input:
          return { 
            ...input,
            data: {
              ...input.data,
              label: texts?.payment.forms[input.data.name]?.title
            },
            value: moralForm.get(input.data.name).value,
            errorMessage: texts?.payment.forms[input.data.name]?.error
          };
        default: 
          return {
            ...input
          }
      }
    });
    setListInputs(list)
  };

  useEffect(() => {
    moralForm = (FormBuilder.group({
      businessName: [(editForm  && editForm.businessName )? editForm.businessName : "" ,Validators.required],
      rfc: [(editForm  && editForm.rfc) ? editForm.rfc : "" ,[Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
      zipCode: [(editForm  && editForm.address && editForm.address.zipCode) ? editForm.address.zipCode : "", [Validators.required, Validators.minLength(5), Validators.maxLength(5)] ],
      state: [(editForm  && editForm.address.state) ? editForm.address.state : "", Validators.required ],
      city: [(editForm  && editForm.address.city )? editForm.address.city : "",Validators.required ],
      neighborhood: [(editForm  && editForm.address.neighborhood )? editForm.address.neighborhood : "",Validators.required ],
      street: [(editForm  && editForm.address.street) ? editForm.address.street : "", Validators.required ],
      curp: [(editForm  && editForm.curp) ? editForm.curp : "" ,[Validators.required,Validators.minLength(18),Validators.maxLength(18)]],
      email: [(editForm  && editForm.email) ? editForm.email : "" ],
      cfdi: [(editForm  && editForm.cfdiUsage )? editForm.cfdiUsage: "" ,Validators.required],
      regime: [editForm && editForm.regime ? editForm.regime : "",Validators.required],
      personType: [2]
    }));

    initialValues()
    moralForm.get('rfc').valueChanges.subscribe(() => {
      handleErrorsInput('rfc');
    })
    moralForm.get('curp').valueChanges.subscribe(() => {
      handleErrorsInput('curp');
    })
    moralForm.get('businessName').valueChanges.subscribe(() => {
      handleErrorsInput('businessName');
    })
    moralForm.get('zipCode').valueChanges.subscribe(() => {
      const zip = moralForm.get("zipCode").value;
      if (zip.length === 5) {
        dispatch(getZipService(zip));
      }
      handleErrorsInput('zipCode');
    })
    moralForm.get('city').valueChanges.subscribe(() => {
      handleErrorsInput('city');
    })
    moralForm.get('neighborhood').valueChanges.subscribe(() => {
      handleErrorsInput('neighborhood');
    })
    moralForm.get('street').valueChanges.subscribe(() => {
      handleErrorsInput('street');
    })
    moralForm.get("cfdi").valueChanges.subscribe((value) => {
      setListInputs((state) => {
        return state.map((item) => {
          if (item.name === "regime") {
            switch (value) {
              case "D10":
                return {
                  ...item,
                  options: taxRegime?.D10,
                };
              case "G03":
                return {
                  ...item,
                  options: taxRegime?.G03,
                };
              case "P01":
                return {
                  ...item,
                  options: taxRegime?.P01,
                };
              default:
                return {
                  ...item,
                  options: [],
                };
            }
          } else {
            return {
              ...item
            }
          }
        });
      });
    });


    moralForm.valueChanges.subscribe((res) => {
      
      // if(moralForm.value.zipCode.length === 5 && moralForm.value.state.length === 0) {
      //   const info = getZip(moralForm.value.zipCode);
      //   console.log(getZip(moralForm.value.zipCode))
      //   const state = info.state[0];
      //   const city = info.municipy[0];
      //   const colonys = info.colony;
        // const list = listInputs.map((input) => {
        //   return {
        //     ...input,
        //     value: ( input.data.name === 'state' || input.data.name === 'city' ) ? 
        //       (input.data.name === 'state' ? state:city):moralForm.value[input.data.name]
        //   }
        // })

        //setListInputs(list);
        //moralForm.get('state').setValue(state)
        //moralForm.get('city').setValue(municipy);
      //}

      if(moralForm.valid) {
        onSave(moralForm.value)
      } else {
        onSave(null);
      }
    })

    let zipObsRef = zipObs.subscribe((zip) => {
      moralForm.get("city").setValue(zip.municipy[0]);
      // setListInputs(state => {
      //   return state.map((input) => {
      //     if(input.name === 'neighborhood'){
      //       const optionNeigh = zip.colony.map((neigh) => { return {value:neigh, text: neigh, active:false}})
      //       return {...input, options: optionNeigh }
      //     }
      //     return {...input}
      //   })
      // })
      moralForm.get('state').setValue(zip.id)
      initialValues();
    });
    return () => {zipObsRef.unsubscribe()}
  },[]) // eslint-disable-line react-hooks/exhaustive-deps 


  const handleKeyPress = (name,value) => {
    moralForm.get(name).setValue(value);
  }

  return (
    <>
      {listInputs.map((inputData, index) => {
        return (
          <div className="inputtax" key={index + 'moraldiv'}>
            {
              inputData.typeCmp === typesInputs.input ? (
                <Input
                  key={inputData.name}
                  data={inputData.data}
                  value={inputData.value}
                  hasError={inputData.hasError}
                  errorMessage={inputData.errorMessage}
                  eventKeyPress={(e) => {
                    handleKeyPress(inputData.data.name, e.detail.value,)
                  }}
                />
              ) : (
                <Select
                  key={index + 'moral'}
                  data={inputData.data}
                  options={inputData.options ? inputData.options : null}
                  onClick={(e) => {
                    handleKeyPress(inputData.name, e.detail)
                  }}
                />
              )
            }
            
          </div>
        );
      })}
    </>
  );
};

export default Moral;