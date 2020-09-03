export default (
  state = {
    dispatcherMarker: null,
    senderMarker: null,
    receiverMarker: null,
    markersConfig: [],
    directions: null,
    secondDirections: null,
    distance: 0,
    secondDistance: 0,
    money: 0,
    estimateTime: 0,
  },
  action
) => {
  switch (action.type) {
    case "SET_DISPATCHER_MARKER":
      return { ...state, dispatcherMarker: action.payload };
    case "SET_SENDER_MARKER":
      return { ...state, senderMarker: action.payload };
    case "SET_RECEIVER_MARKER":
      return { ...state, receiverMarker: action.payload };
    case "SET_MARKERS_CONFIG":
      const newConfig = [
        state.dispatcherMarker,
        state.senderMarker,
        state.receiverMarker,
      ];
      return {
        ...state,
        markersConfig: newConfig.filter((marker) => marker !== null),
      };
    case "SET_DIRECTIONS":
      return { ...state, directions: action.payload };
    case "SET_SECOND_DIRECTIONS":
      return { ...state, secondDirections: action.payload };
    case "SET_DISTANCE":
      return { ...state, distance: action.payload };
    case "SET_SECOND_DISTANCE":
      return { ...state, secondDistance: action.payload };

    case "SET_ESTIMATE_TIME":
      return { ...state, estimateTime: action.payload };
    case "SET_MONEY":
      return { ...state, money: action.payload };
    default:
      return state;
  }
};
