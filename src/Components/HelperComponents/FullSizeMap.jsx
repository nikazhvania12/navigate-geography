import WorldMap from "./WorldMap";

function FullSizeMap({ isVisible, setIsVisible, selectedCountries} ) {
    return (
        isVisible && selectedCountries &&
            <div className="full-size-map-container" onClick={() => setIsVisible(false)}>
                <WorldMap selectedCountries={selectedCountries} isFullSize={true} />
            </div>
    )
}

export default FullSizeMap;