import faker from '../apis/faker';

// Page 1
export const setSenderName = name => {
  return {
    type: 'SET_SENDER_NAME',
    payload: name
  }
};

export const setDispatcher = dispatcher => {
  return {
    type: 'SET_DISPATCHER',
    payload: dispatcher
  }
};

export const setSenderPhone = phone => {
  return {
    type: 'SET_SENDER_PHONE',
    payload: phone
  }
};

export const setConditionalRender = render => {
  return {
    type: 'SET_CONDITIONAL_RENDER',
    payload: render
  }
};

export const setSenderAddress = address => {
  return {
    type: 'SET_SENDER_ADDRESS',
    payload: address
  }
};

export const setSenderZip = zip => {
  return {
    type: 'SET_SENDER_ZIP',
    payload: zip
  }
};

// Page 2
export const setReceiverName = name => {
  return {
    type: 'SET_RECEIVER_NAME',
    payload: name
  }
};

export const setReceiverPhone = phone => {
  return {
    type: 'SET_RECEIVER_PHONE',
    payload: phone
  }
};

export const setReceiverAddress = address => {
  return {
    type: 'SET_RECEIVER_ADDRESS',
    payload: address
  }
};

export const setReceiverZip = zip => {
  return {
    type: 'SET_RECEIVER_ZIP',
    payload: zip
  }
};

// Page 3
export const setShippingMethod = method => {
  return {
    type: 'SET_SHIPPING_METHOD',
    payload: method
  }
};

// Async
export const fetchEstimateTime = () => async dispatch => {
  const response = await faker.get('/companies?_quantity=5');
  dispatch({ type: 'FETCH_ESTIMATE_TIME', payload: response.data });
};

export const fetchMoney = () => async dispatch => {
  const response = await faker.get('/companies?_quantity=5');
  dispatch({ type: 'FETCH_MONEY', payload: response.data });
};

export const fetchOrderID = () => async dispatch => {
  const response = await faker.get('/companies?_quantity=5');
  dispatch({ type: 'FETCH_ORDER_ID', payload: response.data });
};

