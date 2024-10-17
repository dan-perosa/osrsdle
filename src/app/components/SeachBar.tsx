import React, { ChangeEventHandler } from 'react';

interface Equipment {
  id: number;
  image: string;
  equipment_name: string;
  equipment_name_color: string;
  members: string;
  members_color: string;
  stab_attack: number;
  stab_attack_color: string;
  stab_attack_arrow: string;
  slash_attack: number;
  slash_attack_color: string;
  slash_attack_arrow: string;
  crush_attack: number;
  crush_attack_color: string;
  crush_attack_arrow: string;
  magic_attack: number;
  magic_attack_color: string;
  magic_attack_arrow: string;
  ranged_attack: number;
  ranged_attack_color: string;
  ranged_attack_arrow: string;
  stab_defence: number;
  stab_defence_color: string;
  stab_defence_arrow: string;
  slash_defence: number;
  slash_defence_color: string;
  slash_defence_arrow: string;
  crush_defence: number;
  crush_defence_color: string;
  crush_defence_arrow: string;
  magic_defence: number;
  magic_defence_color: string;
  magic_defence_arrow: string;
  ranged_defence: number;
  ranged_defence_color: string;
  ranged_defence_arrow: string;
  strength: number;
  strength_color: string;
  strength_arrow: string;
  ranged_strength: number;
  ranged_strength_color: string;
  ranged_strength_arrow: string;
  magic_damage: string;
  magic_damage_color: string;
  magic_damage_arrow: string;
  prayer: number;
  prayer_color: string;
  prayer_arrow: string;
  weight: number;
  weight_color: string;
  weight_arrow: string;
}

type SearchBarProps = {
  title: string;
  userInput: string;
  handleInputChange: ChangeEventHandler;
  filteredEquipments: Equipment[];
  handleEquipmentSelect: (equipment: Equipment) => void;
};

export const Button = ({ title, userInput, handleInputChange, filteredEquipments, handleEquipmentSelect }: SearchBarProps) => {
  return (
<div>
  <div className='flex flex-col items-center justify-center w-full '>
    <h1 className="text-4xl font-bold mb-4" style={{ color: '#E1C12B' }}>
      Ammunition Slot Equipment
    </h1>
    <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="mb-4 px-4 py-2 border rounded-lg bg-gray-800 text-lightGray focus:outline-none"
        placeholder="Guess the equipment name"
      />
  </div>
  {filteredEquipments.length > 0 && (
  <div className="bg-gray-700 rounded-lg w-full max-w-md shadow-lg mb-4 max-h-[120px] overflow-auto z-10">
    <ul>
      {filteredEquipments.map(equipment => (
        <li
          key={equipment.id}
          onClick={() => handleEquipmentSelect(equipment)}
          className="cursor-pointer hover:bg-gray-600 p-2"
        >
          {equipment.equipment_name}
        </li>
      ))}
    </ul>
  </div>
  )}
</div>
  );
};
