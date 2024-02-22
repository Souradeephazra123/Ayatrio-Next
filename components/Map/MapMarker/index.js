import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const PopupPortal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

const MapMarker = ({ place }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleMarkerClick = () => {
    // console.log("Marker clicked", place?.name);
    setPopupOpen(!isPopupOpen);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  // console.log("Rendering MapMarker for", place);

  return (
    <div className="marker-container gmap-marker">
      {place && place.name && place.thumbnail && (
        <>
          <div className="marker-info" onClick={handleMarkerClick}>
            <div className="info-wrapper wrapper">
              <div className="info-title">
                <span className="title-text">{place.name}</span>
              </div>
              <div
                className="info-image"
                style={{
                  backgroundImage: `url(${place.thumbnail})`,
                }}
              ></div>
            </div>
          </div>

          {isPopupOpen && (
            <PopupPortal>
              <div className="mt-6 custom-popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white pb-4 shadow-lg rounded-md w-[320px] h-[490px] mx-auto z-50">
               
                {place.images && place.images.length > 0 && (
                  <>
                  <div className="relative flex">
                  <img
                      className="rounded w-full h-auto"
                      src={place.images[0]}
                      alt={place.name}
                    />
                     <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={handleClose}
                >
                  Close
                </button>
                  </div>
                   

                    <div className="text-gray-800 ml-1">
                      <div className="flex flex-row items-center">
                        <div className="text-xl font-semibold">
                          {place.name}
                        </div>
                        <div className="ml-2 text-gray-500">
                          {place.address.slice(0, 20)}
                        </div>
                      </div>
                      <div className="text-gray-600">{place.phone}</div>
                    </div>
                  </>
                )}
              </div>
            </PopupPortal>
          )}
        </>
      )}

      {!place ||
        !place.name ||
        (!place.thumbnail && (
          <div className="marker-info" onClick={handleMarkerClick}>
            <div className="info-wrapper wrapper">
              <div className="info-title">
                <span className="title-text">Default Place</span>
              </div>
              <div
                className="info-image"
                style={{
                  backgroundImage:
                    'url("https://bolt-gcdn.sc-cdn.net/3/Z2i0CKb1i5GtNvg8xNoP7.256.IRZXSOY?mo=GlgaFhoAGgAyAX06AQRCBgjm_5mrBlBJYAFaEERmTGFyZ2VUaHVtYm5haWyiARQIgAIiDwoCSAISACoHSVJaWFNPWaIBFAiaCiIPCgJIAxIAKgdJUlpYU09Z&uc=73")',
                }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MapMarker;
