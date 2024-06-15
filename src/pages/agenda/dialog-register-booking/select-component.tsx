import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SelectFilterProps {
  placeholder: string
  items: {
    id: string
    display: string
  }[]
  onValueChange: (itemId: string) => void
}

export const SelectComponent: React.FC<SelectFilterProps> = ({placeholder, items, onValueChange}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            items.map(item => {
              return (
                <SelectItem value={item.id}>{item.display}</SelectItem>
              )
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}