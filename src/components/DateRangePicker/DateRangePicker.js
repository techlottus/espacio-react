import { memo, useEffect, useRef, useState } from "react";
import './DateRangePicker.scss';

const DateRangePicker = memo(({ onFirstDate, onSecondDate, dateFirst, dateSecond, firstDateLabel, secondDateLabel }) => {
  const [ firstDate, setFirstDate ] = useState('')
  const [ secondDate, setSecondDate ] = useState('')
  const [ firstLabel, setFirstLabel ] = useState('Inicio')
  const [ secondLabel, setSecondLabel ] = useState('Fin')
  const [ minDateAvaliable, setMinDateAvaliable ] = useState('')

  const firstDateRef = useRef()
  const secondDateRef = useRef()

  useEffect(() => {
    if(!!dateFirst) {
      onFirstDateChange({target: {value: dateFirst}}, !!dateSecond ? { target: { value: dateSecond } } : undefined)
    }
  }, [dateFirst, dateSecond])

  useEffect(() => {
    if (!!firstDateLabel) {
      setFirstLabel(firstDateLabel)
    }
    if (!!secondDateLabel) {
      setSecondLabel(secondDateLabel)
    }
  }, [firstDateLabel, secondDateLabel])

  const onFirstDateChange = (evt, evt2) => {
    const { value } = evt.target;
    setFirstDate(value)
    setSecondDate('')
    onSecondDate('')
    const day = new Date(value);
    const yyyy = day.getFullYear();
    const mm = day.getMonth() < 9 ? `0${day.getMonth() + 1}` : day.getMonth() + 1;
    const dd = day.getDate() + 2 < 9 ? `0${day.getDate() + 2}` : day.getDate() + 2;
    const newMin = `${yyyy}-${mm}-${dd}`;
    setMinDateAvaliable(newMin)
    if (!!evt2) {
      onSecondDateChange(evt2);
    }
    onFirstDate(value)
  }
  
  const onSecondDateChange = (evt) => {
    const { value } = evt.target;
    setSecondDate(value)
    onSecondDate(value)
  }

  const handlerKeyUp = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
  }

  const handlerOuterClickFirst = () => {
    firstDateRef.current.showPicker();
  }
  
  const handlerOuterClickSecond = () => {
    secondDateRef.current.showPicker();
  }

  return <div className="datepickerwrapper">
    <div>
      <label>{firstLabel}</label>
      <input ref={firstDateRef} type="date" value={firstDate} onChange={onFirstDateChange} onKeyDown={handlerKeyUp} onClick={handlerOuterClickFirst} />
    </div>
    <div>
      <label>{secondLabel}</label>
      <input ref={secondDateRef} type="date" disabled={!firstDate} min={minDateAvaliable} value={secondDate} onChange={onSecondDateChange} onClick={handlerOuterClickSecond} />
    </div>
  </div>
})

export default DateRangePicker;