import faker from "../apis/faker";

// Page 1
export const setSenderName = (name) => {
  return {
    type: "SET_SENDER_NAME",
    payload: name,
  };
};

export const setDispatcher = (dispatcher) => {
  return {
    type: "SET_DISPATCHER",
    payload: dispatcher,
  };
};

export const setSenderPhone = (phone) => {
  return {
    type: "SET_SENDER_PHONE",
    payload: phone,
  };
};

export const setConditionalRender = (render) => {
  return {
    type: "SET_CONDITIONAL_RENDER",
    payload: render,
  };
};

export const setSenderAddress = (address) => {
  return {
    type: "SET_SENDER_ADDRESS",
    payload: address,
  };
};

export const setSenderZip = (zip) => {
  return {
    type: "SET_SENDER_ZIP",
    payload: zip,
  };
};

// Page 2
export const setReceiverName = (name) => {
  return {
    type: "SET_RECEIVER_NAME",
    payload: name,
  };
};

export const setReceiverPhone = (phone) => {
  return {
    type: "SET_RECEIVER_PHONE",
    payload: phone,
  };
};

export const setReceiverAddress = (address) => {
  return {
    type: "SET_RECEIVER_ADDRESS",
    payload: address,
  };
};

export const setReceiverZip = (zip) => {
  return {
    type: "SET_RECEIVER_ZIP",
    payload: zip,
  };
};

// Page 3
export const setShippingMethod = (method) => {
  return {
    type: "SET_SHIPPING_METHOD",
    payload: method,
  };
};

export const setEstimateTime = estimateTime => {
  return {
    type: "SET_ESTIMATE_TIME",
    payload: estimateTime
  }
};

export const setMoney = money => {
  return {
    type: "SET_MONEY",
    payload: money,
  }
};

// Map
export const setDispatcherMarker = (position) => {
  return {
    type: "SET_DISPATCHER_MARKER",
    payload: position,
  };
};

export const setSenderMarker = (position) => {
  return {
    type: "SET_SENDER_MARKER",
    payload: position,
  };
};

export const setReceiverMarker = (position) => {
  return {
    type: "SET_RECEIVER_MARKER",
    payload: position,
  };
};

export const setMarkersConfig = () => {
  return {
    type: "SET_MARKERS_CONFIG",
  }
}

export const setDirections = directions => {
  return {
    type: "SET_DIRECTIONS",
    payload: directions,
  }
}

export const setSecondDirections = directions => {
  return {
    type: "SET_SECOND_DIRECTIONS",
    payload: directions,
  }
}

export const setDistance = distance => {
  return {
    type: "SET_DISTANCE",
    payload: distance,
  }
}

export const setSecondDistance = distance => {
  return {
    type: "SET_SECOND_DISTANCE",
    payload: distance,
  }
}