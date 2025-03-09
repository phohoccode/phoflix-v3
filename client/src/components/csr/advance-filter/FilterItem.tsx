"use client";

interface FilterItemProps {
  option: any;
  filter: any;
  handleSetFilter: (key: string, value: string) => void;
}

const FilterItem = ({ option, filter, handleSetFilter }: FilterItemProps) => {
  return (
    <ul className="flex flex-wrap gap-4 items-center">
      {option.data.map((item: any, index: number) => (
        <li
          onClick={() => handleSetFilter(option.id, item.slug)}
          key={index}
          className={`px-1 lg:text-sm text-xs cursor-pointer hover:text-[#f1c40f] transition-all
             ${
               filter[option.id] === item.slug
                 ? "text-[#f1c40f]"
                 : "text-gray-50"
             }
          `}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default FilterItem;
