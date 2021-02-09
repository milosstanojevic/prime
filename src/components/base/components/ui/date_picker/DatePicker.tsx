import React, {useCallback, useState} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {Menu} from "../menu";
import {Button} from "../buttons";
import {Bubble} from "../bubble";

export const DatePicker = () => {
  const [date, setDate] = useState<Date|undefined>()

  const handleDayClick = useCallback((day, { selected }) => {
    setDate(selected ? undefined : day)
  }, [])

  return (
    <Menu
      target={<Button>{date ? date.toLocaleDateString() : 'Choose Date'}</Button>}
    >
      <Bubble>
        <DayPicker
          selectedDays={date}
          onDayClick={handleDayClick}
        />
      </Bubble>
    </Menu>
  )
}
