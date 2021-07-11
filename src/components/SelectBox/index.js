import Select from 'react-select';
import './style.css'
const SelectBox = ({isDisabled = false, isSearchable=true, defaultValue, options, name, classes, selectHandler, placeholder="Select.."})=> {
    console.log(options)
    return (
        <Select
        className={classes}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        name={name}
        options={options}
        placeholder={placeholder}
        onChange={selectHandler}
      />
      );
}

export default SelectBox;