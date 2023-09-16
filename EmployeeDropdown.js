import React, { useState } from 'react';
import './index.css'

function EmployeeDropdown({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleCheckbox = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const selectAllChildren = (parentId) => {
    const parentCategory = data.find((item) => item.id === parentId);
    if (parentCategory) {
      const subItems = parentCategory.children.map((child) => child.id);
      setSelectedItems([...selectedItems, ...subItems]);
    }
  };

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const isSubItemsSelected = (parentId) => {
    const parentCategory = data.find((item) => item.id === parentId);
    if (parentCategory) {
      const subItems = parentCategory.children.map((child) => child.id);
      return subItems.every((subItem) => selectedItems.includes(subItem));
    }
    return false;
  };

  const handleParentCheckboxChange = (parentId) => {
    const parentCategory = data.find((item) => item.id === parentId);
    if (parentCategory) {
      const subItems = parentCategory.children.map((child) => child.id);
      if (isSubItemsSelected(parentId)) {
        setSelectedItems(selectedItems.filter((item) => !subItems.includes(item)));
      } else {
        setSelectedItems([...selectedItems, ...subItems]);
      }
    }
  };

  const countSelected = () => {
    return selectedItems.length;
  };

  return (
    <div className="employee-dropdown">
      <div
        className="dropdown-icon"
        onMouseEnter={toggleDropdown}
        onClick={toggleDropdown}
      >
        Click to open dropdown
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedItems.length === data.length}
                onChange={() => handleParentCheckboxChange('selectAll')}
              />
              Select All
            </label>
          </div>
          {data.map((item) => (
            <div key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                {item.name}
              </label>
              {item.children && (
                <button onClick={() => selectAllChildren(item.id)}>
                  Select All Sub Items
                </button>
              )}
            </div>
          ))}
          <div className="count">
            Selected: {countSelected()} out of {data.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDropdown;
