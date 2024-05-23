import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SelectFilterProps {
  placeholder: string
  label: string
  items: {
    id: string
    display: string
  }[]
}

export const SelectFilter: React.FC<SelectFilterProps> = ({placeholder, label, items}) => {
  return (
    <Select>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
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