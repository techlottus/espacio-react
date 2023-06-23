import React, { useEffect, useState } from "react";
import {
  inputsFisicaTax,
  typesInputs,
} from "../../../../constants/Payment.constant";
import { Input } from "../../../../components/Input/Input";
import { FormBuilder, Validators } from "react-reactive-form";
import { Select } from "../../../../components/Select/Select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getZipService } from "../../../../middlewares/paymentMiddleware";
import { zipObs } from "../../../../observables/zipObservable";

const Physical = ({ onSave }) => {
  const { texts } = useSelector((state) => state.texts);
  const { taxRegime } = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  const editForm = useSelector((state) => state.payment.editForm);
  let physicalForm;

  const [listInputs, setListInputs] = useState([...inputsFisicaTax]);

  const initTaxRegime = () => {
    setListInputs((state) => {
      return state.map((item) => {
        if (item.name === "regime" && physicalForm?.value?.cfdi) {
          switch (physicalForm?.value?.cfdi) {
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
            ...item,
          };
        }
      });
    });
  };

  useEffect(() => {
    initTaxRegime();
  }, [taxRegime, physicalForm?.value?.cfdi]);

  const handleErrorsInput = (name) => {
    const error = physicalForm.get(name).errors;
    setListInputs((state) => {
      return state.map((input) => {
        if (input.typeCmp === typesInputs.input) {
          return {
            ...input,
            hasError: input.data.name === name && error !== null ? true : false,
          };
        } else {
          return {
            ...input,
          };
        }
      });
    });
  };

  const initialValues = () => {
    const list = listInputs.map((input) => {
      switch (input.typeCmp) {
        case typesInputs.select:
          return {
            ...input,
            data: {
              ...input.data,
              textDefault:
                input.name === "cfdi"
                  ? "*Uso de CFDI"
                  : texts?.payment.forms[input.name]?.title,
            },

            options: input.options
              ? input.options.map((option) => {
                  return {
                    ...option,
                    active:
                      option.value === physicalForm.get(input.name)?.value,
                  };
                })
              : [],
          };
        case typesInputs.input:
          return {
            ...input,
            value: physicalForm.get(input.data.name)?.value,
            data: {
              ...input.data,
              label: texts?.payment.forms[input.data.name]?.title,
            },
            errorMessage: texts?.payment.forms[input.data.name]?.error,
          };
        default:
          return {
            ...input,
          };
      }
    });
    setListInputs(list);
  };

  useEffect(() => {
    physicalForm = FormBuilder.group({
      fullName: [
        editForm && editForm.fullName ? editForm.fullName : "",
        Validators.required,
      ],
      rfc: [
        editForm && editForm.rfc ? editForm.rfc : "",
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      zipCode: [
        editForm && editForm.address && editForm.address.zipCode
          ? editForm.address.zipCode
          : "",
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      state: [
        editForm && editForm.address.state ? editForm.address.state : "",
        Validators.required,
      ],
      city: [
        editForm && editForm.address.city ? editForm.address.city : "",
        Validators.required,
      ],
      neighborhood: [
        editForm && editForm.address.neighborhood
          ? editForm.address.neighborhood
          : "",
        Validators.required,
      ],
      country: [
        editForm && editForm.address.country ? editForm.address.country : "",
      ],
      street: [
        editForm && editForm.address.street ? editForm.address.street : "",
        Validators.required,
      ],
      curp: [
        editForm && editForm.curp ? editForm.curp : "",
        [
          Validators.required,
          Validators.minLength(18),
          Validators.maxLength(18),
        ],
      ],
      email: [editForm && editForm.email ? editForm.email : ""],
      cfdi: [
        editForm && editForm.cfdiUsage && editForm.regime
          ? editForm.cfdiUsage
          : "",
        Validators.required,
      ],
      regime: [
        editForm && editForm.regime ? editForm.regime : "",
        Validators.required,
      ],
      personType: [1],
    });

    initialValues();
    initTaxRegime();

    physicalForm.get("rfc").valueChanges.subscribe(() => {
      handleErrorsInput("rfc");
    });
    physicalForm.get("curp").valueChanges.subscribe(() => {
      handleErrorsInput("curp");
    });
    physicalForm.get("fullName").valueChanges.subscribe(() => {
      handleErrorsInput("fullName");
    });
    physicalForm.get("zipCode").valueChanges.subscribe(() => {
      const zip = physicalForm.get("zipCode").value;
      if (zip.length === 5) {
        dispatch(getZipService(zip));
      }
      handleErrorsInput("zipCode");
    });
    physicalForm.get("city").valueChanges.subscribe(() => {
      handleErrorsInput("city");
    });
    physicalForm.get("neighborhood").valueChanges.subscribe(() => {
      handleErrorsInput("neighborhood");
    });
    physicalForm.get("street").valueChanges.subscribe(() => {
      handleErrorsInput("street");
    });
    physicalForm.get("cfdi").valueChanges.subscribe((value) => {
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
              ...item,
            };
          }
        });
      });
    });

    physicalForm.valueChanges.subscribe((res) => {
      // console.log("suscribe: ", physicalForm.valid, physicalForm.value);
      // if (
      //   physicalForm.value.zipCode.length === 5 &&
      //   physicalForm.value.state.length === 0
      // ) {
      //   const info = getZip(physicalForm.value.zipCode);
      //   console.log(getZip(physicalForm.value.zipCode));
      //   const state = info.state[0];
      //   const city = info.municipy[0];
      //   const colonys = info.colony;
      // const list = listInputs.map((input) => {
      //   return {
      //     ...input,
      //     value:
      //       input.name === "state" || input.name === "city"
      //         ? input.name === "state"
      //           ? state
      //           : city
      //         : physicalForm.value[input.name],
      //   };
      // });
      // setListInputs(list);
      //physicalForm.get('state').setValue(state)
      //physicalForm.get('city').setValue(municipy);
      // }

      if (physicalForm.valid) {
        onSave(physicalForm.value);
      } else {
        onSave(null);
      }
    });

    let zipObsRef = zipObs.subscribe((zip) => {
      physicalForm.get("city").setValue(zip.municipy[0]);
      // setListInputs(state => {
      //   return state.map((input) => {
      //     if(input.name === 'neighborhood'){
      //       const optionNeigh = zip.colony.map((neigh) => { return {value:neigh, text: neigh, active:false}})
      //       return {...input, options: optionNeigh }
      //     }
      //     return {...input}
      //   })
      // })
      physicalForm.get("state").setValue(zip.id);
      initialValues();
    });
    return () => {
      zipObsRef.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyPress = (name, value) => {
    physicalForm.get(name).setValue(value);
  };

  return (
    <>
      {listInputs.map((inputData, index) => {
        return (
          <div className="inputtax" key={index + "moraldiv"}>
            {inputData.typeCmp === typesInputs.input ? (
              <Input
                key={index + "moral"}
                data={inputData.data}
                value={inputData.value}
                hasError={inputData.hasError}
                errorMessage={inputData.errorMessage}
                eventKeyPress={(e) => {
                  handleKeyPress(inputData.data.name, e.detail.value);
                }}
              />
            ) : (
              <Select
                key={index + "moral"}
                data={inputData.data}
                options={inputData.options ? inputData.options : null}
                onClick={(e) => {
                  handleKeyPress(inputData.name, e.detail);
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default Physical;
