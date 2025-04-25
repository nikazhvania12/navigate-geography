import { useEffect, useState } from "react"
import GetCountriesFilter from "../../Controllers/Countries/GetCountriesFilter"


function FilterCountryDropdown({ isVisible, setVisible, filterCountryName, setViewCountries, setFilterCountryName, SetError }) {

    const [DropdownCountries, setDropDownCountries] = useState([]);


    useEffect(() => {
        const fetchCountries = async () => {

            if(filterCountryName !== '') {
                const countries = await GetCountriesFilter(SetError, filterCountryName);
                setDropDownCountries(countries);
            }
            else {
                setDropDownCountries([]);
            }
        };
      
        fetchCountries();
      }, [filterCountryName, SetError]);

    const handleCountrySelect = (country) => {
        setVisible(false);
        setViewCountries([country]);
        setFilterCountryName(country.name);
    }

    return (
        isVisible &&
            <div className="filter-dropdown">
                {DropdownCountries && DropdownCountries.map((country, index) => {
                return (
                    <div className="dropdown-country" key={index} onClick={() => handleCountrySelect(country) }>
                        <img src={country.additional_info.flag_path} alt='country_flag' className="dropdown-flag" />
                        {"\u00A0"}
                        {"\u00A0"}
                        {"\u00A0"}
                        {"\u00A0"}
                        <h5>{country.name}</h5>
                    </div>
                )})}
            </div>
    )
}

export default FilterCountryDropdown;