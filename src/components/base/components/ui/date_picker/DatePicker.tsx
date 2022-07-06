import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Menu } from "../menu";
import { Button } from "../buttons";
import { Bubble } from "../bubble";
import { format } from "date-fns";

export const DatePicker: React.FC = () => {
  const [selected, setSelected] = React.useState<Date>();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  return (
    <Menu
      target={
        <Button>
          {selected ? selected.toLocaleDateString() : "Choose Date"}
        </Button>
      }
    >
      <Bubble>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
        />
      </Bubble>
    </Menu>
  );
};
